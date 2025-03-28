// Post Controller

const postModel = require("../models/postModel");

// get all posts(protected)
const get_all_posts = async (req, res, next) => {
  try {
    const posts = await postModel.find().populate("author", "username name");
    res.json({ posts, message: "Post retrieved successfully" });
  } catch (error) {
    next(error);
  }
};

//create a post(protected)
const create_a_post = async (req, res, next) => {
  const userId = req.user._id;
  try {
    if (!req.body) {
      return res.status(404).json({ message: "Post not found" });
    }
    const newPost = new postModel({ ...req.body, author: userId });
    await newPost.save();
    res.status(201).json({ newPost, message: "Post created successfully" });
  } catch (err) {
    next(err);
  }
};

// get a post(protected)
const get_a_post = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ post, message: "Post retrieved successfully" });
  } catch (err) {
    next(err);
  }
};

//update a post(protected)
const update_a_post = async (req, res, next) => {
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

    // Ensure only the owner can update the
    if (post.author.toString() !== req.user._id.toString()) {
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
      .json({ message: "Post updated successfully.", post: updatedPost });
  } catch (error) {
    next(error);
  }
};

// delete a post(protected)
const delete_a_post = async (req, res, next) => {
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
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Access denied: You can only delete your own posts.",
      });
    }
    const deletedPost = await postModel.findByIdAndDelete(id);

    if (!deletedPost) {
      return res
        .status(404)
        .json({ message: "Posts not found with the provided ID." });
    }
    res
      .json({ post: deletedPost, message: "Post deleted successfully" })
      .status(200);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  get_all_posts,
  create_a_post,
  get_a_post,
  update_a_post,
  delete_a_post,
};
