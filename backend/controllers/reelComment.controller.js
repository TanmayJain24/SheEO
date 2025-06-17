// import { ReelComment } from "../models/reelComment.model.js";
// import { Reel } from "../models/reel.model.js";
// import { User } from "../models/user.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

// export const addReelComment = async (req, res) => {
//     try {
//         const { text } = req.body;
//         const reelId = req.params.id;
//         const userId = req.id;

//         if (!text) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Comment text is required"
//             });
//         }

//         const reel = await Reel.findById(reelId);
//         if (!reel) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Reel not found"
//             });
//         }

//         const comment = await ReelComment.create({
//             text,
//             author: userId,
//             reel: reelId
//         });

//         await comment.populate({
//             path: 'author',
//             select: 'username profilePicture'
//         });

//         reel.comments.push(comment._id);
//         await reel.save();

//         // Socket.io notification for reel owner
//         if (reel.author.toString() !== userId) {
//             const commenter = await User.findById(userId).select('username profilePicture');
//             const reelOwnerSocketId = getReceiverSocketId(reel.author);
            
//             if (reelOwnerSocketId) {
//                 io.to(reelOwnerSocketId).emit('reelNotification', {
//                     type: 'comment',
//                     user: commenter,
//                     reelId: reel._id,
//                     commentId: comment._id,
//                     message: `${commenter.username} commented on your reel`
//                 });
//             }
//         }

//         return res.status(201).json({
//             success: true,
//             message: "Comment added successfully",
//             comment
//         });

//     } catch (error) {
//         console.error("Error adding reel comment:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// };

// export const getReelComments = async (req, res) => {
//     try {
//         const reelId = req.params.id;
//         const { page = 1, limit = 10 } = req.query;

//         const reel = await Reel.findById(reelId);
//         if (!reel) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Reel not found"
//             });
//         }

//         const comments = await ReelComment.find({ reel: reelId })
//             .sort({ createdAt: -1 })
//             .skip((page - 1) * limit)
//             .limit(parseInt(limit))
//             .populate('author', 'username profilePicture');

//         const totalComments = await ReelComment.countDocuments({ reel: reelId });

//         return res.status(200).json({
//             success: true,
//             comments,
//             totalComments,
//             currentPage: parseInt(page),
//             totalPages: Math.ceil(totalComments / limit)
//         });

//     } catch (error) {
//         console.error("Error fetching reel comments:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// };

// export const deleteReelComment = async (req, res) => {
//     try {
//         const commentId = req.params.commentId;
//         const userId = req.id;

//         const comment = await ReelComment.findById(commentId);
//         if (!comment) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Comment not found"
//             });
//         }

//         // Check if user is author or reel owner
//         const reel = await Reel.findById(comment.reel);
//         if (comment.author.toString() !== userId && reel.author.toString() !== userId) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Unauthorized to delete this comment"
//             });
//         }

//         // Remove comment from reel's comments array
//         await Reel.findByIdAndUpdate(comment.reel, {
//             $pull: { comments: commentId }
//         });

//         // Delete the comment
//         await ReelComment.findByIdAndDelete(commentId);

//         return res.status(200).json({
//             success: true,
//             message: "Comment deleted successfully"
//         });

//     } catch (error) {
//         console.error("Error deleting reel comment:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// };




import { ReelComment } from "../models/reelComment.model.js";
import { Reel } from "../models/reel.model.js";
import { User } from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const addReelComment = async (req, res) => {
    try {
        const { text } = req.body;
        const reelId = req.params.id;
        const userId = req.id;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "Comment text is required"
            });
        }

        const reel = await Reel.findById(reelId);
        if (!reel) {
            return res.status(404).json({
                success: false,
                message: "Reel not found"
            });
        }

        const comment = await ReelComment.create({
            text,
            author: userId,
            reel: reelId
        });

        await comment.populate({
            path: 'author',
            select: 'username profilePicture'
        });

        reel.comments.push(comment._id);
        await reel.save();

        // Socket.io notification for reel owner
        if (reel.author.toString() !== userId) {
            const commenter = await User.findById(userId).select('username profilePicture');
            const reelOwnerSocketId = getReceiverSocketId(reel.author);
            
            if (reelOwnerSocketId) {
                io.to(reelOwnerSocketId).emit('reelNotification', {
                    type: 'comment',
                    user: commenter,
                    reelId: reel._id,
                    commentId: comment._id,
                    message: `${commenter.username} commented on your reel`
                });
            }
        }

        return res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment
        });

    } catch (error) {
        console.error("Error adding reel comment:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const getReelComments = async (req, res) => {
    try {
        const reelId = req.params.id;
        const { page = 1, limit = 10 } = req.query;

        const reel = await Reel.findById(reelId);
        if (!reel) {
            return res.status(404).json({
                success: false,
                message: "Reel not found"
            });
        }

        const comments = await ReelComment.find({ reel: reelId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('author', 'username profilePicture');

        const totalComments = await ReelComment.countDocuments({ reel: reelId });

        return res.status(200).json({
            success: true,
            comments,
            totalComments,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalComments / limit)
        });

    } catch (error) {
        console.error("Error fetching reel comments:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const deleteReelComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.id;

        const comment = await ReelComment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        // Check if user is author or reel owner
        const reel = await Reel.findById(comment.reel);
        if (comment.author.toString() !== userId && reel.author.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to delete this comment"
            });
        }

        // Remove comment from reel's comments array
        await Reel.findByIdAndUpdate(comment.reel, {
            $pull: { comments: commentId }
        });

        // Delete the comment
        await ReelComment.findByIdAndDelete(commentId);

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting reel comment:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};