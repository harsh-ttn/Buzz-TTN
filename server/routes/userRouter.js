import express from "express";
import User from "../schemas/userSchema.js";
import bcrypt from "bcrypt";
import auth from "../middleware/auth.js";
import cloudinary from "../utils/cloudinaryUtils.js";

const router = express.Router();

//get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(400).send("Error getting Users");
  }
});

//get user
router.get("/user/:id", async (req, res) => {
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

//update user
router.put("/user/:id", async (req, res) => {
  try {
    let {
      fName,
      lName,
      userImage,
      designation,
      userWebsite,
      city,
      state,
      gender,
      zip,
      birthDate,
    } = req.body;

    const name = fName + " " + lName;

    if (userImage !== "") {
      const fileStr = userImage;
      const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr);
      userImage = uploadedResponse.url;
      console.log(uploadedResponse);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: name,
          userImage: userImage,
          designation: designation,
          userWebsite: userWebsite,
          city: city,
          state: state,
          gender: gender,
          zip: zip,
          birthDate: birthDate,
        },
      },
      { new: true }
    );
    res.json({ status: "Updated User", data: user });
  } catch (error) {
    res.status(400).send("Error", error);
  }
});

export default router;
