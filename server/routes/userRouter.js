import express from "express";
import User from "../schemas/userSchema.js";
import bcrypt from "bcrypt";
import auth from "../middleware/auth.js";

const router = express.Router();

//get user
router.get("/user/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(400).send("Error getting User");
  }
});

//create User
router.post("/users", async (req, res) => {
  const { name, email, password, google, userImage } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      if (google) {
        return res.send(user);
      }
      return res.status(400).send("User already registered");
    }

    //hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name: name,
      email: email,
      google: google,
      password: hashedPassword,
      userImage: userImage,
    });
    await user.save();

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(user);
  } catch (error) {
    res.send(error);
  }
});

export default router;
