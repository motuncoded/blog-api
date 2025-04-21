// Post Router Middleware

const { Router } = require("express");

const {
  get_all_posts,
  create_a_post,
  get_a_post,
  update_a_post,
  delete_a_post,
} = require("../controllers/postController");
const { userHandler } = require("../middleware/authHandler");

const postRouter = Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all blog posts
 *     description: Retrieve a list of all blog posts available in the system.
 *     responses:
 *       200:
 *         description: A list of blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Get a single blog post
 *     description: Retrieve the details of a single blog post by its ID.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post
 *     responses:
 *       200:
 *         description: Details of a single blog post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new blog post
 *     description: Create a new blog post. Only authenticated users can perform this action.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the blog post
 *               content:
 *                 type: string
 *                 description: The content of the blog post
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /post/{postId}:
 *   put:
 *     summary: Update a blog post
 *     description: Update an existing blog post by its ID. Only authenticated users can perform this action.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the blog post
 *               content:
 *                 type: string
 *                 description: The updated content of the blog post
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 */

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Delete a blog post
 *     description: Delete an existing blog post by its ID. Only authenticated users can perform this action.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post to delete
 *     responses:
 *       200:
 *         description: Blog post deleted successfully
 */

postRouter
  // Get all posts
  .get("/posts", get_all_posts)

  // Get a post
  .get("/posts/:postId", get_a_post)

  // Create a post
  .post("/post", userHandler, create_a_post)

  // Update a post
  .put("/post/:postId", userHandler, update_a_post)

  // Delete a post
  .delete("/posts/:postId", userHandler, delete_a_post);

module.exports = postRouter;
