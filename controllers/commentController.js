// Comment Controller

const commentModel = require("../models/commentModel");
const postModel = require("../models/postModel");

// Create a new comment
const create_comment = async (req, res, next) => {
  const { content, postId } = req.body;
  const userId = req.user._id;

  try {
    const createComment = new commentModel({
      content,
      author: userId,
      post: postId,
    });

    await createComment.save();

    await postModel.findByIdAndUpdate(postId, {
      $push: { comments: createComment._id },
    });
    res
      .status(201)
      .json({ createComment, message: "Comment created successfully" });
  } catch (error) {
    next(error);
  }
};

// Get all comments for a post
const get_all_comments = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const comments = await commentModel
      .find({ post: postId })
      .populate("author", "username");
    res
      .status(200)
      .json({ comments, message: "Comment retrieved successfully" });
  } catch (error) {
    next(error);
  }
};

// Get a specific comment by ID
const get_comment_by_id = async (req, res, next) => {
  const { commentId } = req.params;

  try {
    const comment = await commentModel
      .findById(commentId)
      .populate("author", "username");
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res
      .status(200)
      .json({ comment, message: "Comment retrieved successfully" });
  } catch (error) {
    next(error);
  }
};
// Update a comment by ID
const update_comment = async (req, res, next) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user._id;

  try {
    const comment = await commentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Access denied, please login as an admin" });
    }

    comment.content = content || comment.content;
    comment.updatedAt = Date.now();

    await comment.save();
    res.json({ comment, message: "Comment updated successfully" });
  } catch (error) {}
};

// Delete a comment by ID
const delete_comment = async (req, res, next) => {
  const { commentId } = req.params;
  const userId = req.user._id;
  try {
    const comment = await commentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Access denied, please login as an admin" });
    }

    // Remove the comment
    const deletedComment = await commentModel.findByIdAndDelete(commentId);

    await postModel.findByIdAndUpdate(comment.post, {
      $pull: { comments: commentId },
    });

    res
      .status(200)
      .json({ deletedComment, message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

//Delete all comments under a specific post
const delete_all_comments_by_post = async (req, res, next) => {
  const { postId } = req.params;

  try {
    // Retrieve all comments for the post
    const comments = await commentModel.find({ post: postId });

    // Delete each comment
    for (const comment of comments) {
      await commentModel.findByIdAndDelete(comment._id);
    }

    // Remove references to comments in the post
    await postModel.findByIdAndUpdate(postId, { $set: { comments: [] } });

    res.status(200).json({ message: "All comments deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create_comment,
  get_all_comments,
  get_comment_by_id,
  update_comment,
  delete_comment,
  delete_all_comments_by_post,
};
