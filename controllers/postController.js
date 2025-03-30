// Post Controller

const postModel = require("../models/postModel");

// get all posts(protected)
const get_all_posts = async (req, res, next) => {
  try {

   // Find all posts, populate the author and comments fields, and sort by creation date in descending order
    const posts = await postModel
      .find()
      .populate("author", "username name")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username",
        },
      })
      .sort({ createdAt: -1 });
    res.json({ posts, message: "Post retrieved successfully" });
  } catch (error) {
    next(error);
  }
};

//create a post(protected)
const create_a_post = async (req, res, next) => {
  const userId = req.user._id; // Get the userId from the authenticated user
  try {
    if (!req.body) {
      return res.status(404).json({ message: "Post not found, create a post" });
    }
    // Create a new post instance with the request body and the author set to the authenticated user
    const newPost = new postModel({ ...req.body, author: userId });
    // Save the post to the database
    await newPost.save();
    res.status(201).json({ newPost, message: "Post created successfully" });
  } catch (err) {
    next(err);
  }
};

// get a post(protected)
const get_a_post = async (req, res, next) => {
  const { postId } = req.params;// Extract postId from the request parameters
  try {

    // Find the post by its ID and populate the author and comments fields
    const post = await postModel
      .findById(postId)
      .populate("author", "username name")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username",
        },
      });

       // If the post is not found, return a 404 response
    if (!post) {
      return res.status(404).json({ message: "Post not found, create a post" });
    }
    res.status(200).json({ post, message: "Post retrieved successfully" });
  } catch (err) {
    next(err);
  }
};

//update a post(protected)
const update_a_post = async (req, res, next) => {
  const { postId } = req.params; // Extract postId from the request parameters
  const updates = req.body; // Extract updates from the request body

  try {
    const userId = req.user._id;// Get the userId from the authenticated user
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Please log in to update a post." });
    }
    // Find the post by its ID
    const post = await postModel.findById(postId);
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

    // Update the post with the new details
    const updatedPost = await postModel.findByIdAndUpdate(postId, updates, {
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
  const { postId } = req.params;// Extract postId from the request parameters
  try {
    const userId = req.user._id;// Get the userId from the authenticated user
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Please log in to delete a post." });
    }
    //if the post by its ID
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found, create a post" });
    }
    // Ensure only the owner can delete the post
    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Access denied: You can only delete your own posts.",
      });
    }


    //delete the post
    const deletedPost = await postModel.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res
        .status(404)
        .json({ message: "Posts not found with the provided ID." });
    }
    res.json({ deletedPost, message: "Post deleted successfully" }).status(200);
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
