// User Model

const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    gmail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Admin roles
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("user", userModel);
