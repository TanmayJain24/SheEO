import { spawn } from 'child_process';
import { Post } from '../models/post.model.js';
import { User } from '../models/user.model.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ML System State
const mlSystem = {
    process: null,
    status: 'not_started', // 'not_started', 'starting', 'loading_data', 'training', 'ready', 'error'
    callbacks: new Map(),
    requestQueue: []
};

const startPythonProcess = () => {
    const pythonProcess = spawn('python', [
        path.join(__dirname, '../ml/feed_algorithm.py')
    ], {
        stdio: ['pipe', 'pipe', 'pipe'],  // Explicit pipes
        windowsHide: true                 // Prevent Windows-specific hangs
    });

    let pythonBuffer = '';
    pythonProcess.stdout.on('data', (data) => {
        pythonBuffer += data.toString();
        const messages = pythonBuffer.split('\n');
        pythonBuffer = messages.pop() || ''; // Leave incomplete message
        
        messages.forEach(rawMessage => {
            if (!rawMessage.trim()) return;
            try {
                const msg = JSON.parse(rawMessage);
                console.log('[Python]', msg);
                if (msg.status === 'ready_for_commands') {
                    mlSystem.status = 'ready_for_commands';
                }
                if (msg.requestId && mlSystem.callbacks.has(msg.requestId)) {
                    const { resolve } = mlSystem.callbacks.get(msg.requestId);
                    mlSystem.callbacks.delete(msg.requestId);
                    resolve(msg);
                }
            } catch (e) {
                console.error('Parse Error:', rawMessage);
            }
        });
    });


    pythonProcess.stderr.on('data', (data) => {
        try {
            const log = JSON.parse(data.toString().trim());
            console.log('[Python Debug]', log.log);
        } catch (e) {
            console.error('[Python Error]', data.toString());
        }
    });

    pythonProcess.on('error', (err) => {
        console.error('Python process error:', err);
        mlSystem.status = 'error';
    });

    pythonProcess.on('close', (code) => {
        console.error(`Python exited with code ${code}`);
        mlSystem.status = 'error';
    });

    return pythonProcess;
};

export const initializeML = async () => {
    try {
        console.log('Starting ML initialization...');
        mlSystem.process = startPythonProcess();
        
        // Wait for ready_for_commands
        await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Python process timeout (30s)'));
            }, 30000);

            const checkReady = () => {
                if (mlSystem.status === 'ready_for_commands') {
                    clearTimeout(timeout);
                    resolve();
                } else if (mlSystem.status === 'error') {
                    clearTimeout(timeout);
                    reject(new Error('Python process error'));
                } else {
                    setTimeout(checkReady, 100);
                }
            };
            checkReady();
        });

        // Load users in batches
        console.log('Loading users...');
        const userCursor = User.find().cursor();
        for await (const user of userCursor) {
            await sendToPython({
                type: 'add_user',
                user_id: user._id.toString(),
                domains: user.domains
            });
        }

        // Load posts in batches
        console.log('Loading posts...');
        const postCursor = Post.find().populate('author', 'domains').cursor();
        
        for await (const post of postCursor) {
            await sendToPython({
                type: 'add_post',
                post_id: post._id.toString(),
                hashtags: post.hashtags || [],
                author_id: post.author._id.toString(),
                caption: post.caption || ''
            });
        }
    
        // Train model
        console.log('Training model...');
        const result = await sendToPython({ type: 'train' });
        if (!result?.success) {
            throw new Error('Training failed');
        }
        console.log('ML system ready');
        return true;
            
    } catch (error) {
        console.error('ML init failed:', error);
        return false;
    }
};

// Send command to Python
const sendToPython = (command) => {
    return new Promise((resolve) => {
        const requestId = Math.random().toString(36).substring(7);
        mlSystem.callbacks.set(requestId, { resolve });
        mlSystem.process.stdin.write(`${JSON.stringify({
            ...command,
            requestId
        })}\n`);
    });
};

// Get ML recommendations
export const getMLRecommendations = async (userId, n = 50) => {
    if (mlSystem.status !== 'ready_for_commands') {
        throw new Error('ML system not ready');
    }
    const response = await sendToPython({
        type: 'recommend',
        user_id: userId.toString(),
        n
    });

    if (!response?.success) {
        throw new Error('Recommendation failed');
    }
    
    return response;
};

export const getPersonalizedFeed = async (req, res) => {
    try {
        const userId = req.id;
        console.log(`Generating feed for user ${userId}`);
        
        // 1. Get ML recommendations
        let recommendedIds = [];
        try {
            const mlResponse = await getMLRecommendations(userId);
            recommendedIds = mlResponse.recommendations || [];
            console.log(`ML recommendations: ${recommendedIds.length} posts`);
        } catch (mlError) {
            console.log('ML failed, using fallback:', mlError.message);
            recommendedIds = [];
        }

        // 2. Get posts (ML ordered if available)
        let posts = [];
        if (recommendedIds.length > 0) {
            posts = await Post.find({ _id: { $in: recommendedIds } })
                .populate('author', 'username profilePicture')
                .populate({
                    path: 'comments',
                    populate: { path: 'author', select: 'username profilePicture' }
                })
                .lean();
            
            posts = recommendedIds
                .map(id => posts.find(p => p._id.toString() === id))
                .filter(Boolean);
        } else {
            // Fallback: Domain-based feed
            const user = await User.findById(userId).select('domains');
            let posts = await Post.find()
                .sort({ createdAt: -1 })
                .populate('author', 'username profilePicture domains');
            
            const userDomains = user.domains.map(d => d.toLowerCase());
            
            const domainPosts = posts.filter(post => {
                const hashtags = (post.hashtags || []).map(h => h.toLowerCase());
                const captionWords = (post.caption || '').toLowerCase().split(/\s+/);
                return hashtags.some(h => userDomains.includes(h)) || 
                       captionWords.some(w => userDomains.includes(w));
            });

            const otherPosts = posts.filter(post => !domainPosts.includes(post));
            posts = [...domainPosts, ...otherPosts];
        }

        return res.status(200).json({
            success: true,
            posts,
            usingML: recommendedIds.length > 0
        });
        
    } catch (error) {
        console.error('Feed generation failed:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to generate feed'
        });
    }
};

export const checkMLStatus = () => ({
    status: mlSystem.status,
    ready: mlSystem.status === 'ready_for_commands'
});