// import multer from "multer";
// const upload = multer({
//     storage:multer.memoryStorage(),
// });
// export default upload;


import multer from 'multer';

const storage = multer.memoryStorage();

// Configuration for image uploads (posts)
const postConfig = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit for images
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed for posts!'), false);
        }
    }
});

// Configuration for video uploads (reels)
const reelConfig = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB limit for videos
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only video files are allowed for reels!'), false);
        }
    }
});

// Middleware for handling post uploads
export const uploadPost = postConfig.single('image');

// Middleware for handling reel uploads
export const uploadReel = reelConfig.single('video');

// Default export (can be used for generic uploads if needed)
export default multer({ storage: storage });