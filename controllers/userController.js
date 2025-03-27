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

  res.status(200).json({ msg: "User successfully logged out" });
};

// const get_users = (res, req, ) => {
  
// }

module.exports = {
  register,
  login,
  logout
};
