import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.Cloudinary_Name,
  api_key: process.env.Cloudinary_Key,
  api_secret: process.env.Cloudinary_Secret,
});

export default cloudinary;
