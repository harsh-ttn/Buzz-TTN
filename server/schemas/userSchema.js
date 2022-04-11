import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 25 },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
      unique: true,
    },
    userImage: { type: String },
    google: { type: Boolean, defaultValue: false, required: true },
    password: { type: String, required: true, minlength: 5 },
    designation: { type: String, defaultValue: "someone" },
    userWebsite: { type: String, defaultValue: "http://www.google.com" },
    city: { type: String, defaultValue: "some" },
    state: { type: String, defaultValue: "where" },
    gender: { type: String, defaultValue: "male" },
    zip: { type: Number, defaultValue: 100100 },
    birthDate: { type: Date },
  },
  { timeStamp: true }
);

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, "jwtPrivateKey");
};

const User = mongoose.model("User", userSchema);

export default User;
