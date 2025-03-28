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

```
POST /api/auth/register
```

Register users that want to check out products. This end points provides full details for each user

- **Login a user**

```
POST /api/auth/login
```

Login users that want to check out products.

- **Logout a user**

```
POST /api/auth/logout
```

Login users are allowed to logout of the .

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
GET /api/post/:id
```

- **Update a post**

Upadate the post

```
PUT /api/post/:id
```

- **Delete a post**

Delete a post

```
DELETE /api/post/:id
```

##### Comment system for blog posts

- **Create a comment**

Creates a comment under a post

```
POST /api/category
```

- **Get all categories**

Retrieves a list of all categories

```
GET /api/categories
```

- **Get a category**

Retrieves a category

```
GET /api/category/:id
```

- **Update a category**

Upadate a category

```
PUT /api/category/:id
```

- **Delete a category**

Delete a category

```
DELETE /api/category/:id
```

#### Shopping cart

This feature manage the items present in the cart referencing the product and the usee whose items are present.

- **Create an item the cart**

This initiate the cart with items created by the user

```
POST /api/add
```

- **Remove an item in the cart**

This intiate the removal of an item in the cart

```
DELETE /api/remove
```

- **View cart**
  This shows all items present in the cart

```
GET /api/carts
```

- **Clear cart**
  This clears all items present in the cart

```
DELETE /api/clear
```

- **Update the cart**
  This update the items present in the cart

```
PUT /api/update
```

#### Admin spcific actions

This applies to users who has the admin role to manage product
listings, view orders, and update order statuses.

##### Product Management

- **Create a product**
- **Get all products**
- **Get a product**
- **Update a product**
- **Delete a product**

##### Category Management

- **Create a category**
- **Get all categories**
- **Get a category**
- **Update a category**
- **Delete a category**

##### Order Management

- **Get all orders**

Retrieves a list of all orders.

```
GET /api/orders
```

- **Update order status**

Updates the status of an order.

```
PUT /api/order/:id/status
```

- **Delete an order**

Deletes an order.

```
DELETE /api/order/:id
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
git clone https://github.com/motuncoded/blog_api.git
```

2. Navigate to the project directory:

```sh
cd blog_api
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
