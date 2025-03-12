// Post Controller

const postModel = require("../models/postModel");
const userModel = require("../models/userModel");

// get all posts(protected)
const get_All_Posts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Please log in to update a post." });
    }
    const posts = await postModel.find();
    if (posts.length === 0) {
      res.json({ posts, message: "No available Posts" }).status(200);
    }
    res.json({ posts, message: " All posts generated" }).status(200);
  } catch (err) {
    next(err);
  }
};

//publish a post(protected)
const publish_A_Post = async (req, res, next) => {
  const paramId = req.params.id;
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: Please log in to create a post.",
      });
    }
    const user = await userModel.findById(paramId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newPost = new postModel({
      ...req.body,
      userId: paramId,
    });
    const createdPostWithUserId = await newPost.save();
    user.publications.push(createdPostWithUserId._id);
    res.status(200).json({ createdPostWithUserId });
  } catch (err) {
    next(err);
  }
};

// get a post(protected)
const get_A_Post = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: Please log in to update a post.",
      });
    }
    const post = await postModel.findById(id);
    if (!post) {
      return res.json({ message: "Post not found" }).status(404);
    }
    res.json({ post, message: "Post updated successfully" }).status(200);
  } catch (err) {
    next(err);
  }
};

//update a post(protected)
const update_A_Post = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const userId = req.user._id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Please log in to update a post." });
    }
    // Find the book by ID
    const post = await postModel.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found with the provided ID." });
    }

    // Ensure only the owner can update the book
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied: You can only update your own posts.",
      });
    }

    // Update the book with the new details
    const updatedPost = await postModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res
      .status(200)
      .json({ message: "Post updated successfully.", book: updatedPost });
  } catch (error) {
    next(error);
  }
};

// delete a post(protected)
const delete_A_Post = async (req, res, next) => {
  const { id } = req.params;

  try {
    const userId = req.user._id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Please log in to delete a post." });
    }
    const post = await postModel.findById(id);
    if (!post) {
      return res.json({ message: "Post not found" }).status(404);
    }
    if (post.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Access denied: You can only delete your own books.",
      });
    }
    const deletedPost = await postModel.findByIdAndDelete(id);

    if (!deletedPost) {
      return res
        .status(404)
        .json({ message: "Book not found with the provided ID." });
    }
    res
      .json({ post: deletedPost, message: "Post deleted successfully" })
      .status(200);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  get_All_Posts,
  publish_A_Post,
  get_A_Post,
  update_A_Post,
  delete_A_Post,
};