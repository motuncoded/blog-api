const { Router } = require("express");
const {
  create_comment,
  get_all_comments,
  get_comment_by_id,
  update_comment,
  delete_comment,
} = require("../controllers/commentController");
const { userHandler } = require("../middleware/authHandler");

const commentRouter = Router()
  // Create a comment (authenticated users only)
  .post("/comment/create", userHandler, create_comment)

  // Get all comments for a specific post
  .get("/comment/post/:postId", get_all_comments)

  // Get a specific comment by ID
  .get("/comment/:commentId", get_comment_by_id)

  // Update a comment (authenticated users only)
  .put("/comment/:commentId", userHandler, update_comment)

  // Delete a comment (authenticated users only)
  .delete("/comment/:commentId", userHandler, delete_comment);


module.exports = commentRouter;
