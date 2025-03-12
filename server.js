const express = require("express");
const postRouter = require("./routes/postRouter");
const userRouter = require("./routes/userRouter");
const connectdb = require("./db/dbController");
const err = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express(); // app middleware

const port = process.env.PORT;

connectdb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Blog Platform");
});
app.use("/api", postRouter);
app.use("/api", userRouter);

app.use(err);

app.listen(port, () => console.log("Welcome to My Blog"));
