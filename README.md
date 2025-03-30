# Blogging Platform API

### <i>This handles the backend flow for E-commerce application</i>

This is a RESTful API for a blogging platform where users can write, edit, and delete blog posts. Other users can read and comment on blog posts. The platform includes user roles such as admins and regular users.

## 🚀 Features

- **User registration and login**
- **CRUD operations for blog posts**
- **Comment system for blog posts**
- **User roles and permissions**

## 📚 API Documentation

### Base URL

```
https://blog-api-one-pi.vercel.app/
```

### Endpoints

#### User registration and login

- **Register a user**

Users are able to create an account. 

```
POST /api/auth/register
```


- **Login a user**

Users are able to login. 

```
POST /api/auth/login
```

- **Logout a user**

Users are able to logout.

```
POST /api/auth/logout
```

- **Update Admin status**

The user is able to switch role from between being a regular user and an admin to manage some tasks

```
PUT /api/users/:userId/isAdmin
```

#### CRUD operations for blog posts

##### Posts

- **Create a post(s)**

Creates a new post for the blog

```
POST /api/post
```

- **Get all posts**

Retrieves a list of all posts

```
GET /api/posts
```

- **Get a post by id**

Retrieves a post by id

```
GET /api/posts/:postId
```

- **Update a post**

Upadate the details of the post

```
PUT /api/post/:postId
```

- **Delete a post**

Delete a post

```
DELETE /api/posts/:postId
```

#### Comment system for blog posts

- **Create a comment**

Creates a comment under a post

```
POST /api/comment/create
```
- **Get all comments**

Retrieve all comments under a specific post

```
GET /api/comment/post/:postId"
```

- **Get a specific comments**

Retrieve a comment under a specific post using id

```
GET /api/comment/:commentId"
```

- **Update a comment**

Update the comment

```
PUT /api/comment/:commentId
```

- **Delete a comment** 

Delete a comment by id
  
``` 
Delete /api/comment/:commentId
```


#### User roles and permissions

- **Get all users**

Get all users

```
DELETE /api/users
```

- **Get a user**

Get a user by id

```
DELETE /api/users/:userId
```

- **Delete a user**

Delete a user

```
DELETE /api/users/:userId
```

- **Update status of user**
Update status from user to admin and vice versa

```
PUT /api/users/:userId/isAdmin
```

- **Delete a post by a user**

Delete a post

```
DELETE /api/posts/:postId
```

- **Delete a comment**

Delete a comment by a user under a post.

```
Delete /api/comment/:commentId
```

- **Delete all comments** 
This  achieved by the admin to delete all comments under a post. 

```
DELETE /api/comment/post/:postId
```
### Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- MongoDB

## 🔧 Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT for authentication

## 🛠️ Setup & Installation

1. Clone the repository:

```sh
git clone https://github.com/motuncoded/blog-api.git
```

2. Navigate to the project directory:

```sh
cd blog-api
```

3. Install dependencies:

```sh
npm install
```

4. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add necessary environment variables (e.g., database connection strings).

```sh
PORT=5002
MONGODB=your_mongodb_url
JWT_SECRET=your_secret_key
```

5. Start the server:

```sh
npm start
```

## 🧪 Running Tests

Execute the following command to run tests:

```sh
npm test
```

## 🤝 Contributing

Contributions are welcome! Please create an issue or submit a pull request with your improvements.

## 📃 License

This project is licensed under the MIT License.
