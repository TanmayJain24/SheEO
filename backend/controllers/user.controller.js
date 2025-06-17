// import { User } from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";
// import { Post } from "../models/post.model.js";
// he delete kela tari chalel export const register = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         if (!username || !email || !password) {
//             return res.status(401).json({
//                 message: "Something is missing, please check!",
//                 success: false,
//             });
//         }
//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(401).json({
//                 message: "Try different email",
//                 success: false,
//             });
//         };
//         const hashedPassword = await bcrypt.hash(password, 10);
//         await User.create({
//             username,
//             email,
//             password: hashedPassword
//         });
//         return res.status(201).json({
//             message: "Account created successfully.",
//             success: true,
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }

//deepseek
// export const register = async (req, res) => {
//     try {
//         const { username, email, password, domains,role } = req.body;
        
//         if (!username || !email || !password || !domains || domains.length === 0 || !role) {
//             return res.status(401).json({
//                 message: "Something is missing, please check!",
//                 success: false,
//             });
//         }
        
//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(401).json({
//                 message: "Try different email",
//                 success: false,
//             });
//         };
        
//         const hashedPassword = await bcrypt.hash(password, 10);
//         await User.create({
//             username,
//             email,
//             password: hashedPassword,
//             domains, // Save domains to the user
//             role // Save role to the user
//         });
        
//         return res.status(201).json({
//             message: "Account created successfully.",
//             success: true,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "Internal server error",
//             success: false
//         });
//     }
// }

// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(401).json({
//                 message: "Something is missing, please check!",
//                 success: false,
//             });
//         }
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({
//                 message: "Incorrect email or password",
//                 success: false,
//             });
//         }
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             return res.status(401).json({
//                 message: "Incorrect email or password",
//                 success: false,
//             });
//         };

//         const token = await jwt.sign({ userId: user._id }, "jkhajdhasjlhfkjdhsfjhdlfhajsad", { expiresIn: '1d' });

//         // populate each post if in the posts array
//         const populatedPosts = await Promise.all(
//             user.posts.map( async (postId) => {
//                 const post = await Post.findById(postId);
//                 if(post.author.equals(user._id)){
//                     return post;
//                 }
//                 return null;
//             })
//         )
//         user = {
//             _id: user._id,
//             username: user.username,
//             email: user.email,
//             profilePicture: user.profilePicture,
//             bio: user.bio,
//             followers: user.followers,
//             following: user.following,
//             posts: populatedPosts
//         }
//         return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
//             message: `Welcome back ${user.username}`,
//             success: true,
//             user
//         });

//     } catch (error) {
//         console.log(error);
//     }
// };




import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";

export const register = async (req, res) => {
    try {
        const { username, email, password, domains, role } = req.body;
        
        if (!username || !email || !password || !domains || domains.length === 0 || !role) {
            return res.status(401).json({
                message: "Something is missing, please check!",
                success: false,
            });
        }
        
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "Try different email",
                success: false,
            });
        };
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword,
            domains,
            role
        });
        
        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Something is missing, please check!",
                success: false,
            });
        }
        
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        }
        
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        };

        const token = jwt.sign({ userId: user._id }, "jkhajdhasjlhfkjdhsfjhdlfhajsad", { expiresIn: '1d' });

        // Safely populate posts with null checks
        const populatedPosts = await Promise.all(
            user.posts.map(async (postId) => {
                try {
                    const post = await Post.findById(postId);
                    return post && post.author.equals(user._id) ? post : null;
                } catch (error) {
                    console.error(`Error loading post ${postId}:`, error);
                    return null;
                }
            })
        ).then(posts => posts.filter(post => post !== null)); // Filter out null posts

        const userResponse = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            posts: populatedPosts,
            domains: user.domains,
            role: user.role
        };

        return res.cookie('token', token, { 
            httpOnly: true, 
            sameSite: 'strict', 
            maxAge: 24 * 60 * 60 * 1000 
        }).json({
            message: `Welcome back ${user.username}`,
            success: true,
            user: userResponse
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// ... rest of your controller methods remain the same ...






export const logout = async (_, res) => {
    try {
        return res.cookie("token", "", { maxAge: 0 }).json({
            message: 'Logged out successfully.',
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};
export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        let user = await User.findById(userId).populate({path:'posts', createdAt:-1}).populate('bookmarks');
        return res.status(200).json({
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

export const editProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { bio, gender } = req.body;
        const profilePicture = req.file;
        let cloudResponse;

        if (profilePicture) {
            const fileUri = getDataUri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                message: 'User not found.',
                success: false
            });
        };
        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (profilePicture) user.profilePicture = cloudResponse.secure_url;

        await user.save();

        return res.status(200).json({
            message: 'Profile updated.',
            success: true,
            user
        });

    } catch (error) {
        console.log(error);
    }
};
export const getSuggestedUsers = async (req, res) => {
    try {
        const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select("-password");
        if (!suggestedUsers) {
            return res.status(400).json({
                message: 'Currently do not have any users',
            })
        };
        return res.status(200).json({
            success: true,
            users: suggestedUsers
        })
    } catch (error) {
        console.log(error);
    }
};
export const followOrUnfollow = async (req, res) => {
    try {
        const followKrneWala = req.id; // patel
        const jiskoFollowKrunga = req.params.id; // shivani
        if (followKrneWala === jiskoFollowKrunga) {
            return res.status(400).json({
                message: 'You cannot follow/unfollow yourself',
                success: false
            });
        }

        const user = await User.findById(followKrneWala);
        const targetUser = await User.findById(jiskoFollowKrunga);

        if (!user || !targetUser) {
            return res.status(400).json({
                message: 'User not found',
                success: false
            });
        }
        // mai check krunga ki follow krna hai ya unfollow
        const isFollowing = user.following.includes(jiskoFollowKrunga);
        if (isFollowing) {
            // unfollow logic ayega
            await Promise.all([
                User.updateOne({ _id: followKrneWala }, { $pull: { following: jiskoFollowKrunga } }),
                User.updateOne({ _id: jiskoFollowKrunga }, { $pull: { followers: followKrneWala } }),
            ])
            return res.status(200).json({ message: 'Unfollowed successfully', success: true });
        } else {
            // follow logic ayega
            await Promise.all([
                User.updateOne({ _id: followKrneWala }, { $push: { following: jiskoFollowKrunga } }),
                User.updateOne({ _id: jiskoFollowKrunga }, { $push: { followers: followKrneWala } }),
            ])
            return res.status(200).json({ message: 'followed successfully', success: true });
        }
    } catch (error) {
        console.log(error);
    }
}

//CHATGPT ADDED CODE
export const followUser = async (req, res) => {
    console.log("Requesting User ID (req._id):", req.id);
    console.log("User to follow (req.params.id):", req.params.id);
    try {
      const { id } = req.params; // ID of the user to follow
      const currentUserId = req.id;
  
      if (id === currentUserId.toString()) {
        return res.status(400).json({ message: "You can't follow yourself" });
      }
  
      const userToFollow = await User.findById(id);
      const currentUser = await User.findById(currentUserId);
  
      if (!userToFollow.followers.includes(currentUserId)) {
        userToFollow.followers.push(currentUserId);
        currentUser.following.push(userToFollow.id);
        await userToFollow.save();
        await currentUser.save();
        return res.status(200).json({ message: 'Followed successfully' });
      }
  
      res.status(400).json({ message: 'Already following this user' });
    } catch (err) {
      res.status(500).json({ message: 'Error following user', error: err.message });
    }
  };
  
  export const unfollowUser = async (req, res) => {
    try {
      const { id } = req.params; // ID of the user to unfollow
      const currentUserId = req.id;
  
      const userToUnfollow = await User.findById(id);
      const currentUser = await User.findById(currentUserId);
  
      userToUnfollow.followers = userToUnfollow.followers.filter(
        (followerId) => followerId.toString() !== currentUserId.toString()
      );
  
      currentUser.following = currentUser.following.filter(
        (followingId) => followingId.toString() !== id
      );
  
      await userToUnfollow.save();
      await currentUser.save();
  
      res.status(200).json({ message: 'Unfollowed successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error unfollowing user', error: err.message });
    }
  };


  //Deepseek

  // Add this to your user.controller.js
export const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        // Search for users by username or full name (case insensitive)
        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { fullName: { $regex: query, $options: 'i' } }
            ],
            _id: { $ne: req.id } // Exclude the current user from results
        }).select('username fullName profilePicture followers following');

        return res.status(200).json({
            success: true,
            users
        });

    } catch (error) {
        console.error('Search error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error searching users',
            error: error.message
        });
    }
}