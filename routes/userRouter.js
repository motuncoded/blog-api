// User Router Middleware

const express = require("express");
const {
  register,
  get_All_Users,
  login,
  get_A_User,
  update_A_User,
  delete_A_User,
} = require("../controller/userController");
const authHandler = require("../middleware/authHandler");

const userRouter = express
  .Router()
  .post("/user/register", register)
  .get("/users", get_All_Users)
  .post("/user/login", login)
  .get("/user/:id", get_A_User)
  .put("/user/:id", authHandler, update_A_User)
  .delete("/user/:id", authHandler, delete_A_User);

module.exports = userRouter;
