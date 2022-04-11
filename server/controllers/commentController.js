import Comment from "../schemas/commentSchema.js";

export const getCommentCount = async (req, res) => {
  try {
    const postId = req.params.id;
    const count = await Comment.count({ postId: postId });

    res.json({ status: "Comment Count", data: count });
  } catch (error) {
    res.status(400).send(`Error ${error}`);
  }
};

export const getComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ postId: postId })
      .limit(3)
      .sort({ createdAt: -1 });

    res.json({ status: "got All Comments", data: comments });
  } catch (error) {
    res.status(400).send(`Error ${error}`);
  }
};

export const createComment = async (req, res) => {
  try {
    const { postId, author, authorImage, comment } = req.body;

    const newcomment = new Comment({
      author: author,
      authorImage: authorImage,
      comment: comment,
      postId: postId,
    });
    await newcomment.save();
    res.send("Comment Added");
  } catch (error) {
    res.status(400).send("Error", error);
  }
};


