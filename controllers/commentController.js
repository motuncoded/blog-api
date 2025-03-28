// Comment Controller

const commentModel = require("../models/commentModel");

// Create a new comment
const create_comment = async (req, res) => {
  const { content, postId } = req.body;
  const userId = req.user._id;

  try {
    const createComment = new commentModel({
      content,
      author: userId,
      post: postId,
    });

    await createComment.save();
    res
      .status(201)
      .json({ createComment, message: "Comment created successfully" });
  } catch (error) {
    next(error);
  }
};

// Get all comments for a post
const get_all_comments_by_postId = async (req, res) => {
  try {
    const comments = await commentModel
      .find({ post: req.params.postId })
      .populate("author", "username");
    res.json({ comments, message: "Comment retrieved successfully" });
  } catch (error) {
    next(error);
  }
};

// Update a comment by ID
const update_comment = async (req, res) => {
  const { content } = req.body;

  try {
    const comment = await commentModel.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (
      comment.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ error: "Access denied, please login as an admin" });
    }

    comment.content = content || comment.content;
    comment.updatedAt = Date.now();

    await comment.save();
    res.json(comment);
  } catch (error) {}
};

// Delete a comment by ID
const delete_comment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (
      comment.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ error: "Access denied, please login as an admin" });
    }

    await comment.remove();
    res.json({ message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create_comment,
  get_all_comments_by_postId,
  update_comment,
  delete_comment,
};
