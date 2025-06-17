import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     username:{type:String, required:true, unique:true},
//     email:{type:String,required:true,unique:true},
//     password:{type:String,required:true},
//     profilePicture:{type:String,default:''},
//     bio:{type:String, default:''},
//     gender:{type:String,enum:['male','female']},
//     followers:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
//     following:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
//     posts:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
//     bookmarks:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
//     // deepseek: Add to your User schema:
//     reels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reel' }]
// },{timestamps:true});

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['entrepreneur', 'investor'], required: true}, // Add this line
    profilePicture: {type: String, default: ''},
    bio: {type: String, default: ''},
    gender: {type: String, enum: ['male', 'female']},
    domains: [{type: String}], // Add this line for domains
    //personalized feed
    // domainEngagement: { 
    //     type: Map, 
    //     of: Number,
    //     default: {} 
    //   },
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    bookmarks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    reels: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reel'}]
}, {timestamps: true});


export const User = mongoose.model('User', userSchema);