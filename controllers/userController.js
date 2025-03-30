//user Controller

const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../jwt/generateToken");

// create a user
const register = async (req, res, next) => {
  const { username, password, gmail, name } = req.body;

  if (!username || !password || !gmail) {
    return res.status(404).json({ message: "Please provide all details" });
  }

  const gmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!gmailRegex.test(gmail)) {
    return res.status(400).json({ msg: "Invalid gmail address" });
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

    res.status(201).json({ newUser, message: "User registered successfully" });
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
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({ message: "Password or gmail incorrect" });
    }

    const token = generateToken(user._id);
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

const logout = async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NOD_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
  });

  res.status(200).json({ message: "User successfully logged out" });
};

const get_all_users = async (req, res, next) => {
   try {
    const users = await userModel.find().select('-password');
    res.status(200).json({users, message:"Users retrieved successfully."});
  } catch (error) {
    next(error);
  }
}

// Get a user by ID
const get_a_user = async (req, res, next) => {
  const { userId } = req.params;  // Extract userId from the request parameters

  try {
    const user = await userModel.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Delete a user by ID
const delete_a_user = async (req, res, next) => {
  const { userId } = req.params;  // Extract userId from the request parameters

  try {
    // Find the user by its ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const deletedUser = await userModel.findByIdAndDelete(userId);
    res.status(200).json({deletedUser, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const update_status = async (req, res, next) => {
  const { userId } = req.params;  // Extract userId from the request parameters
  const { isAdmin } = req.body; // Get the new status from the request body

  try {
        // Find the user by its ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isAdmin = isAdmin;
    await user.save();

    res
      .status(200)
      .json({ user, message: "User admin status updated successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  register,
  login,
  logout,
  get_all_users,
  get_a_user,
  delete_a_user,
  update_status
};
