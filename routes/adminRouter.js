const { Router } = require("express");
const {
  delete_comment,
  delete_all_comments_by_post,
} = require("../controllers/commentController");
const { userHandler, adminHandler } = require("../middleware/authHandler");

const {
  delete_a_post,
} = require("../controllers/postController");
const {get_all_users, get_a_user, delete_a_user, update_status} = require("../controllers/userController")


const adminRouter = Router()
  //Get all users
  .get("/users", userHandler, adminHandler, get_all_users)
  //Get a user
  .get("/users/:userId", userHandler, adminHandler, get_a_user)
  //Delete a user
  .delete("/users/:userId", userHandler, adminHandler, delete_a_user)
 // Update status from user to admin and vice versa
 .put("/users/:userId/isAdmin", userHandler, adminHandler, update_status )
 
 
    // Delete a post by user
  .delete("/posts/:postId", userHandler, adminHandler, delete_a_post)


  // Delete a comment
  .delete("/comment/:commentId", userHandler, adminHandler, delete_comment)
  // Delete all comment
  .delete(
    "/comment/post/:postId",
    userHandler,
    adminHandler,
    delete_all_comments_by_post,
  );

  
module.exports = adminRouter;
