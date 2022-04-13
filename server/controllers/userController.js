import User from "../schemas/userSchema.js";
import bcrypt from "bcrypt";
import cloudinary from "../utils/cloudinaryUtils.js";

//gets all users
export const getUsers = async (req, res) => {
  try {
    const userId = req.query.userId;

    const user = await User.findById(userId);
    const friends = user.friends;

    const users = await User.find({ _id: { $nin: [userId, ...friends] } });

    res.send(users);
  } catch (error) {
    res.status(400).send("Error getting Users");
  }
};

//get a user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(400).send("Error getting User");
  }
};

//register user
export const registerUser = async (req, res) => {
  const { name, email, password, google, moderator, userImage } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      if (google) {
        const token = user.generateAuthToken();
        return res
          .header("x-auth-token", token)
          .send({ user: user, token: token });
      }
      return res.status(400).json({ errorMessage: "User already registered" });
    }

    //hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name: name,
      email: email,
      google: google,
      moderator: moderator,
      password: hashedPassword,
      userImage: userImage,
    });
    await user.save();

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send({ user: user, token: token });
  } catch (error) {
    res.send(error);
  }
};

//user Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ errorMessage: "Invalid email or password" });

    if (user.google === true) {
      return res
        .status(400)
        .json({ errorMessage: "User must do Google Login" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .json({ errorMessage: "Invalid email or password" });

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).json({ user: user, token: token });
  } catch (error) {
    res.send(`Error: ${error}`);
  }
};

//update User
export const updateUser = async (req, res) => {
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
      /* console.log(uploadedResponse); */
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
};
