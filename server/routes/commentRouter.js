import express from "express";
import {
  createComment,
  getComments,
  getCommentCount,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/comments", createComment);
router.get("/comments/:id", getComments);
router.get("/commentsCount/:id", getCommentCount);

export default router;
