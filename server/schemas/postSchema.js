import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 3,
    },
    image: {
      type: String,
    },
    author: {
      type: String,
      required: true,
      minlength: 3,
    },
    authorId: {
      type: String,
    },
    authorImage: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
