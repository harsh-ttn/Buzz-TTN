import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    friendId: {
      type: String,
      reuired: true,
    },
    friendName: {
      type: String,
    },
    friendImage: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

const Friend = mongoose.model("Friend", friendSchema);

export default Friend;
