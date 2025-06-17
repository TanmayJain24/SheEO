import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    caption:{type:String, default:''},
    image:{type:String, required:true},
    author:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    comments:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}],
    hashtags: [{type: String, lowercase: true}],
    // domain: { type: String, required: true } // Should already exist
});
postSchema.index({ hashtags: 1 });
export const Post = mongoose.model('Post', postSchema);