import express from "express";
import {
  makeFriend,
  getFriends,
  confirmFriend,
} from "../controllers/friendController.js";

const router = express.Router();

router.post("/friends", makeFriend);
router.get("/friends", getFriends);
router.post("/confirmfriends", confirmFriend);

export default router;
