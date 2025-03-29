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
  .get("/posts", get_all_posts)
  .get("/post/:postId", get_a_post)
  .post("/post", userHandler, create_a_post)
  .put("/post/:postId", userHandler, update_a_post)
  .delete("/post/:postId", userHandler, delete_a_post);

module.exports = postRouter;
