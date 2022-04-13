import express from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPostsCount,
} from "../controllers/postController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/posts", auth, createPost);
router.get("/posts", auth, getPosts);
router.get("/postsCount/:userId",auth, getPostsCount);
router.put("/posts/:id",auth, updatePost);
router.delete("/posts/:id", auth, deletePost);

export default router;
