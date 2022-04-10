import Post from "../schemas/postSchema.js";
import cloudinary from "../utils/cloudinaryUtils.js";

export const getPostsCount = async (req, res) => {
  try {
    const userId = req.params.userId;
    const count = await Post.count({ authorId: userId });

    res.json({ status: "Post Count", data: count });
  } catch (error) {
    res.status(400).send(`Error ${error}`);
  }
};

export const getPosts = async (req, res) => {
  try {
    let sortType = req.query.sortType;
    let posts;

    if (sortType === "liked") {
      posts = await Post.find().limit(10).sort({ likes: -1 });
    } else if (sortType === "disliked") {
      posts = await Post.find().limit(10).sort({ dislikes: -1 });
    } else if (sortType === "top") {
      posts = await Post.find().limit(10).sort({ likes: -1, dislikes: -1 });
    } else {
      posts = await Post.find().limit(10).sort({ createdAt: -1 });
    }
    res.json({ status: "got All Posts", data: posts });
  } catch (error) {
    res.status(400).send(`Error ${error}`);
  }
};

export const createPost = async (req, res) => {
  try {
    let {
      content,
      image,
      author,
      authorId,
      authorImage,
      likes,
      dislikes,
      comments,
    } = req.body;

    if (image !== "") {
      const fileStr = image;
      const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr);
      image = uploadedResponse.url;
      console.log(uploadedResponse);
    }

    const post = new Post({
      content: content,
      image: image,
      author: author,
      authorId: authorId,
      authorImage: authorImage,
      likes: likes,
      dislikes: dislikes,
      comments: comments,
    });
    await post.save();
    res.json({ status: "Created Post", data: post });
  } catch (error) {
    res.status(400).send(`Error ${error}`);
  }
};

export const updatePost = async (req, res) => {
  try {
    const { content, image, author, authorImage, likes, dislikes, comments } =
      req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          content: content,
          image: image,
          author: author,
          authorImage: authorImage,
          likes: likes,
          dislikes: dislikes,
          comments: comments,
        },
      },
      { new: true }
    );
    res.json({ status: "Updated Post", data: post });
  } catch (error) {
    res.status(400).send(`Error ${error}`);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.delete();
    res.json({ status: "Deleted Post", data: post });
  } catch (error) {
    res.status(400).send(`Error ${error}`);
  }
};
