// Post Router Middleware

const { Router } = require("express");

const {
  get_All_Posts,
create_a_post,
  get_A_Post,
  update_A_Post,
  delete_A_Post,
} = require("../controllers/postController");
const authHandler = require("../middleware/authHandler");

const postRouter = Router()
  .get("/posts", authHandler, get_All_Posts)
  .get("/post/:id", authHandler, get_A_Post)
  .post("/post/:id", authHandler,create_a_post)
  .put("/post/:id", authHandler, update_A_Post)
  .delete("/post/:id", authHandler, delete_A_Post);

module.exports = postRouter;
