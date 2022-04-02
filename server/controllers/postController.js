import Post from "../schemas/postSchema.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().limit(10).sort({ createdAt: -1 });
    res.send(posts);
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
    res.send(post);
  } catch (error) {
    res.status(400).send(`Error ${error}`);
  }
};
