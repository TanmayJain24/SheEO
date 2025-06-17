// import mongoose from "mongoose";

// const reelSchema = new mongoose.Schema({
//     caption: { type: String, default: '' },
//     video: { type: String, required: true },
//     author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//     comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
// }, { timestamps: true });

// export const Reel = mongoose.model('Reel', reelSchema);




import mongoose from "mongoose";

const reelSchema = new mongoose.Schema({
    caption: { type: String, default: '' },
    // video: 
    // { 
    //     type: String, 
    //     required: [true, 'Video URL is required'] 
    // },
    video: { 
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        duration: { type: Number },
        format: { type: String }
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    likes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ReelComment' 
    }],
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add indexes
reelSchema.index({ author: 1 });
reelSchema.index({ createdAt: -1 });

export const Reel = mongoose.model('Reel', reelSchema);