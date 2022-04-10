import express from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPostsCount
} from "../controllers/postController.js";

const router = express.Router();

router.post("/posts", createPost);
router.get("/posts", getPosts);
router.get("/postsCount/:userId", getPostsCount);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
