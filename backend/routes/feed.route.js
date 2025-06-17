// import express from 'express';
// import { 
//     getPersonalizedFeed,
//     initializeML 
// } from '../controllers/feed.controller.js';
// import isAuthenticated from '../middlewares/isAuthenticated.js';

// const router = express.Router();

// // Initialize when server starts
// initializeML();

// router.get('/personalized', isAuthenticated, getPersonalizedFeed);

// export default router;




import express from 'express';
import { 
    getPersonalizedFeed,
    initializeML,
    checkMLStatus
} from '../controllers/feed.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

// Initialize ML system
let initializationPromise = null;

const ensureMLInitialized = async () => {
    if (!initializationPromise) {
        initializationPromise = initializeML()
            .then(success => {
                if (!success) {
                    console.error('ML initialization failed, will retry...');
                    initializationPromise = null;
                }
                return success;
            })
            .catch(error => {
                console.error('ML initialization error:', error);
                initializationPromise = null;
                return false;
            });
    }
    return initializationPromise;
};

// Health check endpoint
router.get('/ml-status', async (req, res) => {
    const status = checkMLStatus();
    res.status(200).json(status);
});

// Personalized feed with initialization check
router.get('/personalized', isAuthenticated, async (req, res) => {
    try {
        // Ensure ML is initialized before processing requests
        await ensureMLInitialized();
        getPersonalizedFeed(req, res);
    } catch (error) {
        console.error('Feed initialization error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to initialize feed system'
        });
    }
});

export default router;