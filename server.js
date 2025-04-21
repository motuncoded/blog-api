const express = require("express");
const postRouter = require("./routes/postRouter");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const commentRouter = require("./routes/commentRouter");
const connectdb = require("./db/dbController");
const err = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
require("dotenv").config();
const path = require("path");
const app = express(); // app middleware




const port = process.env.PORT;

connectdb();


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Define a route to render the index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use("/api", postRouter);
app.use("/api", userRouter);
app.use("/api", commentRouter);
app.use("/api", adminRouter);


app.use(err);

app.listen(port, () => console.log("Welcome to My Blog"));
