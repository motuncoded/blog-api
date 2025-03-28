// User Router Middleware

const express = require("express");
const { register, login, logout } = require("../controllers/userController");

const userRouter = express
  .Router()
  .post("/auth/register", register)
  .post("/auth/login", login)
  .post("/auth/logout", logout);

//.get("/users")

module.exports = userRouter;
