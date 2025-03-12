// Authentication Middleware

const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authHandler = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Access denied. Please log in to continue" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); //to verify that token in cookies matches our created token
    if (!decodedToken) {
      return res.status(401).json({ msg: "Invalid Token" });
    }
    const user = await userModel.findById(decodedToken.id).select("-password"); //to find a userid that matches the token id
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    req.user = user; //passing the verified user to the ongoing request
    next();
  } catch (error) {
    console.error("Authentication Error:", error);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ msg: "Token has expired. Please log in again." });
    }

    return res
      .status(500)
      .json({ msg: "Server error. Please try again later." });
  }
};

module.exports = authHandler;
