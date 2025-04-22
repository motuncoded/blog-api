const { Router } = require("express");
const { register, login, logout } = require("../controllers/userController");
const { userHandler } = require("../middleware/authHandler");
const { update_status } = require("../controllers/userController");

const userRouter = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request. Invalid input.
 */
userRouter.post("/auth/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user with their credentials.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       401:
 *         description: Unauthorized. Invalid credentials.
 */
userRouter.post("/auth/login", login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     description: Invalidate the user's session.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: User logged out successfully.
 *       401:
 *         description: Unauthorized. User is not logged in.
 */
userRouter.post("/auth/logout", logout);

/**
 * @swagger
 * /users/{userId}/isAdmin:
 *   put:
 *     summary: Update user admin status
 *     description: Allow a user to toggle their status between regular user and admin.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose status is being updated.
 *         example: 64a7e4f7b2f8c2f9d71a7e4f
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isAdmin:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User status updated successfully.
 *       400:
 *         description: Bad request. Invalid input.
 *       401:
 *         description: Unauthorized. User is not authenticated.
 *       403:
 *         description: Forbidden. User does not have permission to update status.
 */
userRouter.put("/users/:userId/isAdmin", userHandler, update_status);

module.exports = userRouter;
