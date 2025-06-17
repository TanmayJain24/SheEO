// // import express from "express";
// // import isAuthenticated from "../middlewares/isAuthenticated.js";
// // import { uploadReel } from "../middlewares/multer.js";
// // import { addNewReel } from "../controllers/reel.controller.js";

// // const router = express.Router();

// // router.route("/addreel").post(isAuthenticated, uploadReel, addNewReel);

// // export default router;



// import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { uploadReel } from "../middlewares/multer.js";
// import { 
//   addNewReel, 
//   getAllReels,
//   likeReel,
//   dislikeReel
// } from "../controllers/reel.controller.js";

// const router = express.Router();

// router.post("/addreel", isAuthenticated, uploadReel, addNewReel);
// router.get("/all", isAuthenticated, getAllReels);
// router.get("/:id/like", isAuthenticated, likeReel);
// router.get("/:id/dislike", isAuthenticated, dislikeReel);

// export default router;


import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { uploadReel } from "../middlewares/multer.js";
import { 
    addNewReel, 
    getAllReels,
    likeReel,
    dislikeReel
} from "../controllers/reel.controller.js";
import { 
    addReelComment, 
    getReelComments,
    deleteReelComment
} from "../controllers/reelComment.controller.js";

const router = express.Router();

// Reel routes
router.post("/addreel", isAuthenticated, uploadReel, addNewReel);
router.get("/all", isAuthenticated, getAllReels);
router.get("/:id/like", isAuthenticated, likeReel);
router.get("/:id/dislike", isAuthenticated, dislikeReel);

// Reel comment routes
router.post("/:id/comment", isAuthenticated, addReelComment);
router.get("/:id/comments", isAuthenticated, getReelComments);
router.delete("/comment/:commentId", isAuthenticated, deleteReelComment);

export default router;