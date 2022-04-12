import express from "express";

import {
  getUser,
  getUsers,
  registerUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.post("/users", registerUser);
router.put("/user/:id", updateUser);

export default router;
