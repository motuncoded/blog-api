//user Controller

const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../jwt/generateToken");

// create a user
const register = async (req, res, next) => {
  const { username, password, gmail } = req.body;
  if (!username || !password || !gmail) {
    return res.status(404).json({ message: "Please provide all details" });
  }
  try {
    const user = await userModel.findOne({ gmail });
    if (user) {
      return res.json("User already existed").status(409);
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new userModel({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.json({ newUser, message: "User registered successfully" });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

// log in a user
const login = async (req, res, next) => {
  const { gmail, password } = req.body;

  try {
    const user = await userModel.findOne({ gmail });
    if (!user) {
      return res.json({
        message: "gmail not registered. please register with us",
      });
    }
    const comparison = await bcrypt.compare(password, user.password);
    if (!comparison) {
      return res.status(404).json({ message: "Password or gmail incorrect" });
    }
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const token = generateToken(user._id);
    console.log("Generated Token:", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: "User logged in successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

//get all users
const get_All_Users = async (req, res, next) => {
  try {
    const users = await userModel.find();
    if (users.length === 0) {
      res.json({ users, message: "No available User" }).status(200);
    }
    res.json({ users, message: "All users available" }).status(200);
  } catch (err) {
    next(err);
  }
};

//get a user
const get_A_User = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.json({ message: "User not found" }).status(404);
    }
    res.json({ user, message: "User Found successfully" }).status(200);
  } catch (err) {
    next(err);
  }
};

// update a user
const update_A_User = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { username, gmail, password } = req.body;
    const user = await userModel.findById(id);
    if (!user) {
      return res.json({ message: "User not found" }).status(404);
    }

    if (username) user.username = username;
    if (gmail) user.gmail = gmail;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    await user.save();
    res.json({ message: "User profile updated successfully" });
  } catch (err) {
    next(err);
  }
};

// delete a user
const delete_A_User = async (req, res, next) => {
  const { id } = req.params;

  if (!req.body._id === id) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    res
      .json({ deletedUser, message: "User Profile deleted successfully" })
      .status(200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  get_All_Users,
  get_A_User,
  update_A_User,
  delete_A_User,
};
