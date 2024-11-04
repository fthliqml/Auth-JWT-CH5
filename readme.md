# Car API With JWT Authentication

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-404D59?style=for-the-badge)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white)

## 🚗 Project Description

This project provides an API for managing car data, user authorization (including login, registration, and logout), and user management for superadmins. It supports CRUD operations for car data and includes secure, role-based access control utilizing JWT:

- **Access Tokens** are stored in cookies
- **Refresh Tokens** are stored in the database

The project separates user-related models into **User** (fields: `name`, `role`, `status`) and **UserAuth** (`email`, `password`, `refreshToken`) to enhance organization and security.

## 🌟 Features

This API incorporates role-based access control to ensure that only authorized users can perform certain actions. Below are the access permissions by role:

### Car Management Routes:

- `GET /api/v1/cars` - Accessible by **members**, **admins**, and **superadmins**
- `POST /api/v1/cars` - Accessible by **admins** and **superadmins**
- `PUT /api/v1/cars/:id` - Accessible by **admins** and **superadmins**
- `DELETE /api/v1/cars/:id` - Accessible by **admins** and **superadmins**

### Admin Routes:

- `GET /api/v1/admin/auth` - Retrieve all user data, accessible by **superadmin** only
- `POST /api/v1/admin/register` - Register a new admin, accessible by **superadmin** only
- `DELETE /api/v1/admin/auth/:id` - Delete a user by ID, accessible by **superadmin** only

## 🏗️ Project Structure

This project follows a **service-repository pattern** as below:

```bash
.
├── bin/
├── public/
├── src/
│   ├── api-docs/
│   ├── app/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── services/
│   │   ├── middlewares/
│   │   ├── routes/
│   ├── config/
│   │   ├── database/
│   │   ├── routes/
│   ├── db/
│   │   ├── migrations/
│   │   ├── seeds/
│   └── middlewares/
│   ├── utils/
├── .env
├── .sequelizerc
└── package.json
```

## 🛠️ Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine, used to build fast and scalable server-side applications.
- **Express**: A minimal and flexible Node.js web application framework that simplifies routing and middleware management.
- **Sequelize**: An ORM (Object-Relational Mapping) library for Node.js, providing a straightforward way to interact with SQL databases, including query building and model management.
- **PostgreSQL**: A powerful, open-source relational database management system used to store and manage data.
- **Swagger**: A tool for API documentation that helps visualize, interact with, and test API endpoints directly from the documentation.
- **ESLint**: A code analysis tool that identifies and fixes code issues, ensuring a consistent coding style and reducing errors.

## 📂 API Routes

The API includes three primary route categories:

### 1. 🚘 Car Routes:

- `POST /api/v1/cars` - Create a new car record
- `GET /api/v1/cars` - Retrieve a list of all cars
- `GET /api/v1/cars/:id` - Retrieve details of a specific car by ID
- `PUT /api/v1/cars/:id` - Update a specific car by ID
- `DELETE /api/v1/cars/:id` - Delete a specific car by ID

### 2. 🔐 Authorization Routes:

- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `GET /api/v1/auth/current-user` - Retrieve data of the currently logged-in user

### 3. 🧑‍💼 Admin Routes:

- `GET /api/v1/admin/auth` - Retrieve all user data (accessible by superadmin only)
- `POST /api/v1/admin/register` - Create a new admin (superadmin only)
- `DELETE /api/v1/admin/auth/:id` - Delete a user by ID (superadmin only)

## 📖 API Documentation

- **Postman Documentation**: [Postman Documentation Link](https://documenter.getpostman.com/view/38681458/2sAY4xBhR5)
- **Swagger Documentation**: Below is a screenshot of the Swagger API documentation.

![Swagger Documentation Screenshot](https://github.com/user-attachments/assets/1bebe5d7-b2af-42d4-814d-a3c2375a0f10)
