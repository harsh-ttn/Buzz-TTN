import express from "express";
import bcrypt from "bcrypt";
import User from "../schemas/userSchema.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).send("Invalid email or password");

    if (user.google === true) {
      return res.status(400).send("User must do Google Login");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(token);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
});

export default router;
