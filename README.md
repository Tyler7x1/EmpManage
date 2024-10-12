# EmpManage

## Description
User Management System is a web application that allows for the creation, retrieval, update, and deletion of user accounts. It utilizes MongoDB for data storage and Mongoose for modeling user data. The application provides functionality to manage user credentials securely and efficiently.

## Features
- User registration with unique email and employee ID.
- Password update functionality via email or employee ID.
- Search for users by name, email, or employee ID.
- Retrieve all users.
- Delete users by employee ID.

## Technologies Used
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **Postman**: Tool for testing API endpoints.

# Setup Instructions
## Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

## Clone the Repository
- git clone https://github.com/USERNAME/REPOSITORY.git

## Navigate to the Project Directory
- cd REPOSITORY

## Install Dependencies
- npm install express mongoose

## Setup MongoDB
- Ensure that you have MongoDB running on your machine. If you're using a local MongoDB instance, the default connection string should work. Otherwise, update the connection URI in your application as needed.

## Start the Application
- npm start
- The server will start running on http://localhost:8000

# API Endpoints Summary
## User Registration
### POST /api/users
- Request Body: { "name": "John Doe", "email": "john@example.com", "password": "securePassword", "emp_id": 12345 }

## Update Password
### PATCH /api/users/email/:email
- Request Body: { "password": "newSecurePassword" }

### PATCH /api/users/id/:id
- Request Body: { "password": "newSecurePassword" }

## Find User
- ### GET /api/users/username/:username
- ### GET /api/users/email/:email
- ### GET /api/users/id/:id

## Get All Users
- ### GET /api/users

## Delete User
- ### DELETE /api/users/id/:id
