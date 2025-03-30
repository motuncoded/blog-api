// Post Router Middleware

const { Router } = require("express");

const {
  get_all_posts,
  create_a_post,
  get_a_post,
  update_a_post,
  delete_a_post,
} = require("../controllers/postController");
const { userHandler } = require("../middleware/authHandler");

const postRouter = Router()
  // Get all posts
  .get("/posts", get_all_posts)

  //Get a post
  .get("/posts/:postId", get_a_post)

  // Create a post
  .post("/post", userHandler, create_a_post)

  // Update a post
  .put("/post/:postId", userHandler, update_a_post)

  // Delete a post
  .delete("/posts/:postId", userHandler, delete_a_post);

module.exports = postRouter;
