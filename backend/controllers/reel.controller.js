// // import cloudinary from "../utils/cloudinary.js";
// // import { Reel } from "../models/reel.model.js";
// // import { User } from "../models/user.model.js";

// // export const addNewReel = async (req, res) => {
// //     try {
// //         const { caption } = req.body;
// //         const video = req.file;
// //         const authorId = req.id;

// //         if (!video) return res.status(400).json({ message: 'Video file required', success: false });

// //         // Video upload to Cloudinary
// //         const fileUri = `data:${video.mimetype};base64,${video.buffer.toString('base64')}`;
// //         const cloudResponse = await cloudinary.uploader.upload(fileUri, {
// //             resource_type: "video",
// //             chunk_size: 6000000, // 6MB chunks
// //             eager: [
// //                 { width: 300, height: 300, crop: "pad", audio_codec: "none" },
// //                 { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" }
// //             ],
// //             eager_async: true
// //         });

// //         const reel = await Reel.create({
// //             caption,
// //             video: cloudResponse.secure_url,
// //             author: authorId
// //         });

// //         // Add reel to user's reels array
// //         const user = await User.findById(authorId);
// //         if (user) {
// //             user.reels.push(reel._id);
// //             await user.save();
// //         }

// //         await reel.populate({ path: 'author', select: '-password' });

// //         return res.status(201).json({
// //             message: 'New reel added successfully',
// //             reel,
// //             success: true,
// //         });

// //     } catch (error) {
// //         console.error('Error creating reel:', error);
// //         return res.status(500).json({
// //             message: 'Error creating reel',
// //             error: error.message,
// //             success: false
// //         });
// //     }
// // }







// import cloudinary from "../utils/cloudinary.js";
// import { Reel } from "../models/reel.model.js";
// import { User } from "../models/user.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

// export const addNewReel = async (req, res) => {
//     try {
//         const { caption } = req.body;
//         const video = req.file;
//         const authorId = req.id;

//         if (!video) return res.status(400).json({ message: 'Video file required' });

//         const fileUri = `data:${video.mimetype};base64,${video.buffer.toString('base64')}`;
//         const cloudResponse = await cloudinary.uploader.upload(fileUri, {
//             resource_type: "video",
//             chunk_size: 6000000
//         });

//         const reel = await Reel.create({
//             caption,
//             video: cloudResponse.secure_url,
//             author: authorId
//         });

//         const user = await User.findById(authorId);
//         if (user) {
//             user.reels.push(reel._id);
//             await user.save();
//         }

//         await reel.populate({ path: 'author', select: '-password' });

//         return res.status(201).json({
//             message: 'New reel added',
//             reel,
//             success: true,
//         });

//     } catch (error) {
//         console.error('Error creating reel:', error);
//         return res.status(500).json({
//             message: 'Error creating reel',
//             error: error.message,
//             success: false
//         });
//     }
// }

// export const getAllReels = async (req, res) => {
//     try {
//         const reels = await Reel.find()
//             .sort({ createdAt: -1 })
//             .populate({ 
//                 path: 'author', 
//                 select: 'username profilePicture' 
//             })
//             .populate({
//                 path: 'comments',
//                 populate: {
//                     path: 'author',
//                     select: 'username profilePicture'
//                 }
//             });

//         return res.status(200).json({
//             reels,
//             success: true
//         });
//     } catch (error) {
//         console.error('Error fetching reels:', error);
//         return res.status(500).json({
//             message: 'Error fetching reels',
//             success: false
//         });
//     }
// }

// export const likeReel = async (req, res) => {
//     try {
//         const reelId = req.params.id;
//         const userId = req.id;

//         const reel = await Reel.findById(reelId);
//         if (!reel) return res.status(404).json({ message: 'Reel not found' });

//         await reel.updateOne({ $addToSet: { likes: userId } });
        
//         // Real-time notification logic can be added here
//         return res.status(200).json({ 
//             message: 'Reel liked',
//             success: true 
//         });

//     } catch (error) {
//         console.error('Error liking reel:', error);
//         return res.status(500).json({
//             message: 'Error liking reel',
//             success: false
//         });
//     }
// }

// export const dislikeReel = async (req, res) => {
//     try {
//         const reelId = req.params.id;
//         const userId = req.id;

//         const reel = await Reel.findById(reelId);
//         if (!reel) return res.status(404).json({ message: 'Reel not found' });

//         await reel.updateOne({ $pull: { likes: userId } });
        
//         return res.status(200).json({ 
//             message: 'Reel disliked',
//             success: true 
//         });

//     } catch (error) {
//         console.error('Error disliking reel:', error);
//         return res.status(500).json({
//             message: 'Error disliking reel',
//             success: false
//         });
//     }
// }




import cloudinary from "../utils/cloudinary.js";
import { Reel } from "../models/reel.model.js";
import { User } from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const addNewReel = async (req, res) => {
    try {
        const { caption } = req.body;
        const video = req.file;
        const authorId = req.id;

        // Validate input
        if (!video) {
            return res.status(400).json({ 
                message: 'Video file is required',
                success: false 
            });
        }

        // Check video size (max 50MB)
        if (video.size > 50 * 1024 * 1024) {
            return res.status(400).json({
                message: 'Video size must be less than 50MB',
                success: false
            });
        }

        // Prepare for Cloudinary upload
        const fileUri = `data:${video.mimetype};base64,${video.buffer.toString('base64')}`;
        
        // Upload to Cloudinary with optimizations
        const cloudResponse = await cloudinary.uploader.upload(fileUri, {
            resource_type: "video",
            chunk_size: 6000000, // 6MB chunks
            eager: [
                { 
                    width: 640, 
                    height: 640, 
                    crop: "limit",
                    quality: "auto"
                }
            ],
            eager_async: true,
            transformation: [
                { quality: "auto" },
                { fetch_format: "auto" }
            ]
        });

        // Create reel in database
        const reel = await Reel.create({
            caption,
            video: {
                url: cloudResponse.secure_url,
                publicId: cloudResponse.public_id,
                duration: cloudResponse.duration,
                format: cloudResponse.format
            },
            author: authorId
        });

        // Add reel to user's reels array
        const user = await User.findByIdAndUpdate(
            authorId,
            { $push: { reels: reel._id } },
            { new: true }
        );

        // Populate author info (excluding sensitive data)
        await reel.populate({ 
            path: 'author', 
            select: 'username profilePicture fullName' 
        });

        return res.status(201).json({
            message: 'Reel uploaded successfully',
            reel,
            success: true
        });

    } catch (error) {
        console.error('Error creating reel:', error);
        
        // Handle specific Cloudinary errors
        if (error.message.includes('File size too large')) {
            return res.status(413).json({
                message: 'Video file is too large',
                success: false
            });
        }

        return res.status(500).json({
            message: 'Failed to upload reel',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
            success: false
        });
    }
};

export const getAllReels = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        
        const reels = await Reel.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate({ 
                path: 'author', 
                select: 'username profilePicture fullName' 
            })
            .populate({
                path: 'comments',
                options: { 
                    sort: { createdAt: -1 },
                    limit: 2,
                    populate: {
                        path: 'author',
                        select: 'username profilePicture'
                    }
                }
            });

        const totalReels = await Reel.countDocuments();

        return res.status(200).json({
            reels,
            totalReels,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalReels / limit),
            success: true
        });

    } catch (error) {
        console.error('Error fetching reels:', error);
        return res.status(500).json({
            message: 'Failed to fetch reels',
            success: false
        });
    }
};

export const likeReel = async (req, res) => {
    try {
        const reelId = req.params.id;
        const userId = req.id;

        const reel = await Reel.findById(reelId);
        if (!reel) {
            return res.status(404).json({ 
                message: 'Reel not found',
                success: false 
            });
        }

        // Check if already liked
        const alreadyLiked = reel.likes.includes(userId);
        if (alreadyLiked) {
            return res.status(400).json({
                message: 'You already liked this reel',
                success: false
            });
        }

        // Add like
        await reel.updateOne({ $addToSet: { likes: userId } });

        // Send notification to reel owner if it's not their own like
        if (reel.author.toString() !== userId) {
            const liker = await User.findById(userId).select('username profilePicture');
            const reelOwnerSocketId = getReceiverSocketId(reel.author);
            
            if (reelOwnerSocketId) {
                io.to(reelOwnerSocketId).emit('reelNotification', {
                    type: 'like',
                    user: liker,
                    reelId: reel._id,
                    message: `${liker.username} liked your reel`
                });
            }
        }

        return res.status(200).json({ 
            message: 'Reel liked successfully',
            success: true,
            likesCount: reel.likes.length + 1
        });

    } catch (error) {
        console.error('Error liking reel:', error);
        return res.status(500).json({
            message: 'Failed to like reel',
            success: false
        });
    }
};

export const dislikeReel = async (req, res) => {
    try {
        const reelId = req.params.id;
        const userId = req.id;

        const reel = await Reel.findById(reelId);
        if (!reel) {
            return res.status(404).json({ 
                message: 'Reel not found',
                success: false 
            });
        }

        // Check if not already liked
        const alreadyLiked = reel.likes.includes(userId);
        if (!alreadyLiked) {
            return res.status(400).json({
                message: 'You have not liked this reel',
                success: false
            });
        }

        // Remove like
        await reel.updateOne({ $pull: { likes: userId } });

        return res.status(200).json({ 
            message: 'Reel disliked successfully',
            success: true,
            likesCount: reel.likes.length - 1
        });

    } catch (error) {
        console.error('Error disliking reel:', error);
        return res.status(500).json({
            message: 'Failed to dislike reel',
            success: false
        });
    }
};