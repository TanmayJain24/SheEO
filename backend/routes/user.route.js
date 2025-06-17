import express from "express";
import { editProfile, followOrUnfollow, getProfile, getSuggestedUsers, login, logout, register,followUser,unfollowUser } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
// import { protectRoute } from '../middlewares/isAuthenticated.js';
// Add this to your user.route.js
import { searchUsers } from "../controllers/user.controller.js";


const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isAuthenticated, getProfile);
router.route('/profile/edit').post(isAuthenticated, upload.single('profilePhoto'), editProfile);
router.route('/suggested').get(isAuthenticated, getSuggestedUsers);
// router.route('/followorunfollow/:id').post(isAuthenticated, followOrUnfollow);

//Chatgpt added code
router.put('/follow/:id', isAuthenticated, followUser);
router.put('/unfollow/:id', isAuthenticated, unfollowUser);

//deepseek
router.get('/search', isAuthenticated, searchUsers);


export default router;