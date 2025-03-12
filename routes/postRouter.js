// Post Router Middleware

const { Router } = require("express");

const {
  get_All_Posts,
  publish_A_Post,
  get_A_Post,
  update_A_Post,
  delete_A_Post,
} = require("../controller/postController");
const authHandler = require("../middleware/authHandler");

const postRouter = Router()
  .get("/posts", authHandler, get_All_Posts)
  .get("/post/:id", authHandler, get_A_Post)
  .post("/post/:id", authHandler, publish_A_Post)
  .put("/post/:id", authHandler, update_A_Post)
  .delete("/post/:id", authHandler, delete_A_Post);

module.exports = postRouter;
