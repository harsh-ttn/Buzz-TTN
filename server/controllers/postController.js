import Post from "../schemas/postSchema.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().limit(10).sort({ createdAt: -1 });
    res.json({ status: "got All Posts", data: posts });
  } catch (error) {
    res.status(400).send(`Error ${error}`);
  }
};

export const createPost = async (req, res) => {
  try {
    const { content, image, author, likes, dislikes, comments } = req.body;
    const post = new Post({
      content: content,
      image: image,
      author: author,
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
    const { content, image, author, likes, dislikes, comments } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          content: content,
          image: image,
          author: author,
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
