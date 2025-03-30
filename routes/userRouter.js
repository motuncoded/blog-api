// User Router Middleware

const express = require("express");
const { register, login, logout } = require("../controllers/userController");
const { userHandler } = require("../middleware/authHandler");
const {update_status} = require("../controllers/userController");


const userRouter = express
  .Router()

  // Create a user
  .post("/auth/register", register)

  // Login a user
  .post("/auth/login", login)

  // Logout a user
  .post("/auth/logout", logout)

  //Update the admin status, it allow the user to switch its status from being a regular user to admin
   .put("/users/:userId/isAdmin", userHandler, update_status )
  

module.exports = userRouter;
