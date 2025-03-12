// database controller

const mongoose = require("mongoose");

const connectdb = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB);
  } catch (err) {
    return console.log("Could not connect", err);
  }
  console.log("connected to database");
};

module.exports = connectdb;