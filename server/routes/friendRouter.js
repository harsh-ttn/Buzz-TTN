import express from "express";
import {
  makeFriend,
  getFriends,
  confirmFriend,
} from "../controllers/friendController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/friends", auth, makeFriend);
router.get("/friends", auth, getFriends);
router.post("/confirmfriends", auth, confirmFriend);

export default router;
