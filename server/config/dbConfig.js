import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
  const db_url = process.env.DB_URL_DEV || "mongodb://localhost/buzz";
  try {
    await mongoose.connect(db_url);
    console.log("Connected to DB");
  } catch (error) {
    console.log(`Error ${error}`);
  }
};

export default dbConnect;
