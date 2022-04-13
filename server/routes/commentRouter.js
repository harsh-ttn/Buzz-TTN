import express from "express";
import {
  createComment,
  getComments,
  getCommentCount,
} from "../controllers/commentController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/comments", auth, createComment);
router.get("/comments/:id", auth, getComments);
router.get("/commentsCount/:id", auth, getCommentCount);

export default router;
