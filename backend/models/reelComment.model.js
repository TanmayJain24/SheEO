import mongoose from "mongoose";

const reelCommentSchema = new mongoose.Schema({
    text: { 
        type: String, 
        required: [true, 'Comment text is required'] 
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    reel: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Reel', 
        required: true 
    },
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add indexes for better performance
reelCommentSchema.index({ reel: 1, createdAt: -1 });

export const ReelComment = mongoose.model('ReelComment', reelCommentSchema);