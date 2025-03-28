const { Router } = require("express");
const {
  create_comment,
  get_all_comments_by_postId,
  update_comment,
  delete_comment,
} = require("../controllers/commentController");
const { userHandler, adminHandler } = require("../middleware/authHandler");

const commentRouter = Router()
  .post("/", userHandler, create_comment)
  .get("/:postId", get_all_comments_by_postId)
  .put("/:id", userHandler, update_comment)
  .delete("/:id", userHandler, adminHadler, delete_comment);

module.exports = router;
