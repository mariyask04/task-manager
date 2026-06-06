# Task Management Application

A full-stack Task Management Web Application built using the MERN Stack (MongoDB, Express.js, React/Next.js, Node.js). The application allows users to register, authenticate securely using JWT, and manage their personal tasks through a clean and responsive interface.

## Live Demo

Frontend: https://task-manager-ashen-rho-15.vercel.app/
Backend: https://task-manager-x7sz.onrender.com
GitHub Repository: https://github.com/mariyask04/task-manager

## Features

### Authentication

User Registration
User Login
JWT-based Authentication
Protected Routes
Secure Password Hashing using bcrypt

### Task Management

Create Tasks
View Tasks
Update Tasks
Delete Tasks
Toggle Task Status (Pending / Completed)

### Additional Features

Search Tasks
Filter Tasks by Status
Pagination
Responsive UI
Modal-based Add/Edit Task Forms

## Tech Stack

### Frontend

Next.js (App Router)
React.js
JavaScript (ESM)
Tailwind CSS
Axios

### Backend

Node.js
Express.js
JWT Authentication
bcryptjs

### Database

MongoDB Atlas
Mongoose

### Deployment

Frontend: Vercel
Backend: Render

## Project Structure

task-manager/

├── client/

│   ├── app/

│   ├── components/

│   ├── context/

│   ├── services/

│   └── utils/

│

├── server/

│   ├── controllers/

│   ├── middleware/

│   ├── models/

│   ├── routes/

│   └── config/

│

└── README.md

## Installation & Setup

### Clone Repository

git clone https://github.com/mariyask04/task-manager.git

cd task-manager

## Backend Setup

Navigate to server folder:
cd server

Install dependencies:
npm install

Create .env file:
PORT=5000
MONGODB_URI=(your mongodb connection string)
JWT_SECRET=(your jwt secret)

Start server:
npm run dev

## Frontend Setup

Navigate to client folder:
cd client

Install dependencies:
npm install

Create .env.local file:
NEXT_PUBLIC_API_URL=http://localhost:5000/api

Run frontend:
npm run dev

Frontend will run on:
http://localhost:3000

## API Endpoints

### Authentication

POST /api/auth/register
POST /api/auth/login

### Tasks

GET /api/task
POST /api/task
PUT /api/task/edit/:taskId
DELETE /api/task/delete/:taskId
PATCH /api/task/status/:id

## Database Schema

### User

{
name: String,
email: String,
password: String
}

### Task

{
userId: ObjectId,
title: String,
description: String,
status: "pending" | "completed",
createdAt: Date,
updatedAt: Date
}

## Assignment Requirements Covered

User Registration & Login
JWT Authentication
Protected Routes
Create Task
View Tasks
Update Task
Delete Task
Toggle Task Status
Search Tasks
Filter Tasks
Pagination
Responsive UI
RESTful APIs
MongoDB Integration
Error Handling

## Author

Mariya Shaikh

GitHub: https://github.com/mariyask04
