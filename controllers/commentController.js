// Comment Controller

const commentModel = require("../models/commentModel");
const postModel = require("../models/postModel");

// Create a new comment
const create_comment = async (req, res, next) => {
  const { content, postId } = req.body; // Extract content and postId from the request
  const userId = req.user._id;// Get the userId from the authenticated user

    // Create a new comment instance
  try {
    const createComment = new commentModel({
      content,
      author: userId,
      post: postId,
    });

    // Save the comment to the database
    await createComment.save();

    // Update the post to include the new comment
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
  const { postId } = req.params; // Extract postId from the request parameters
  try {

    // Find all comments for the given postId and populate the author field with the username
    const comments = await commentModel
      .find({ post: postId })
      .populate("author", "username");

    // If no comments are found, return a 404 response
    if (comments.length === 0) {
      return res
        .status(404)
        .json({ message: "Comments not found, Make a comment on this post" });
    }
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
    // Find the comment by its ID and populate the author field with the username
    const comment = await commentModel
      .findById(commentId)
      .populate("author", "username");

    // If the comment is not found, return a 404 response
    if (!comment) {
      return res
        .status(404)
        .json({ message: "Comment not found, make a comment" });
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
  const { commentId } = req.params; // Extract commentId from the request parameters
  const { content } = req.body; // Extract content from the request body
  const userId = req.user._id; // Get the userId from the authenticated user

  try {
    // Find the comment by its ID
    const comment = await commentModel.findById(commentId);

        // If the comment is not found, return a 404 response
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

        // Check if the authenticated user is the author of the comment

    if (comment.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Access denied, please login as an admin" });
    }
 // Update the comment content and updatedAt timestamp
    comment.content = content || comment.content;
    comment.updatedAt = Date.now();

    await comment.save();
    res.json({ comment, message: "Comment updated successfully" });
  } catch (error) {}
};

// Delete a comment by ID
const delete_comment = async (req, res, next) => {
  const { commentId } = req.params; // Extract commentId from the request parameters
  const userId = req.user._id; // Get the userId from the authenticated user

  try {
    // Find the comment by its ID
    const comment = await commentModel.findById(commentId);

    // If the comment is not found, return a 404 response
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the authenticated user is the author of the comment
    if (comment.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Access denied, please login as an admin" });
    }

    // Delete the comment
    const deletedComment = await commentModel.findByIdAndDelete(commentId);

    // Update the post to remove the comment reference
    await postModel.findByIdAndUpdate(comment.post, {
      $pull: { comments: commentId },
    });

    res.status(200).json({ deletedComment, message: "Comment deleted successfully" });
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};


//Delete all comments under a specific post
const delete_all_comments_by_post = async (req, res, next) => {
  const { postId } = req.params; // Extract postId from the request parameters

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
