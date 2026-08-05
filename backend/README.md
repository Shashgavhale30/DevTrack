# DevTrack Backend 🗄️

The **MERN backend** for DevTrack — a developer productivity & progress tracking app.

Built with **Express**, **MongoDB (Mongoose)**, **JWT** authentication, and **bcrypt** for password hashing.

## 🛠 Tech Stack

| Technology | Purpose |
|------------|----------|
| [Node.js](https://nodejs.org) | JavaScript runtime |
| [Express](https://expressjs.com) | Web framework |
| [MongoDB](https://mongodb.com) / [Mongoose](https://mongoosejs.com) | Database & ODM |
| [JWT](https://jwt.io) | Authentication |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing |

## 📁 Project Structure

```
backend/
├── server.js              # Entry point
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   ├── User.js            # User model
│   ├── Project.js         # Project model
│   └── Task.js            # Task model
├── controllers/
│   ├── authController.js  # Auth logic
│   ├── projectController.js # Project CRUD
│   └── taskController.js  # Task CRUD
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
├── middleware/
│   ├── authMiddleware.js  # JWT protection
│   └── errorMiddleware.js # Error handling
├── utils/
│   └── generateToken.js   # JWT token generator
├── .env.example
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 18`
- **MongoDB** — local installation or [MongoDB Atlas](https://www.mongodb.com/atlas)

### Installation

```sh
cd backend
npm install
```

### Configuration

Create a `.env` file from the example:

```sh
cp .env.example .env
```

Then update the values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/devtrack
JWT_SECRET=your_jwt_secret_here_change_me
JWT_EXPIRES_IN=7d
```

### Running the Server

```sh
# Production
npm start

# Development (with auto-reload)
npm run dev
```

The server runs at **http://localhost:5000**.

## 🔌 API Endpoints

| Method | Endpoint                 | Description          | Auth |
|--------|--------------------------|----------------------|------|
| GET    | `/api/health`            | Health check         | No   |
| POST   | `/api/auth/register`     | Register a new user  | No   |
| POST   | `/api/auth/login`        | Login a user         | No   |
| GET    | `/api/auth/me`           | Get current user     | Yes  |
| GET    | `/api/projects`          | Get all projects     | Yes  |
| POST   | `/api/projects`          | Create a project     | Yes  |
| PUT    | `/api/projects/:id`      | Update a project     | Yes  |
| DELETE | `/api/projects/:id`      | Delete a project     | Yes  |
| GET    | `/api/tasks`             | Get all tasks        | Yes  |
| POST   | `/api/tasks`             | Create a task        | Yes  |
| PUT    | `/api/tasks/:id`         | Update a task        | Yes  |
| DELETE | `/api/tasks/:id`         | Delete a task        | Yes  |

> 🔒 Protected routes require a `Authorization: Bearer <token>` header.

---

Made with ❤️ for developers who love tracking their progress.
