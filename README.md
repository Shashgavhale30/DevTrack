# DevTrack 🚀

**A developer productivity & progress tracking app** built with React Native and a MERN backend. DevTrack gives developers a single, beautiful dashboard to monitor their coding activity, projects, and daily goals — all in one place.

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Testing](#testing)
- [Roadmap](#roadmap)

## 📖 About the Project

DevTrack is a mobile-first productivity companion designed for developers. It combines GitHub-style contribution tracking, coding-time analytics, project progress management, and daily task management into one intuitive interface.

The **frontend** is a React Native app (pure JavaScript) with a fully-designed dark-themed dashboard UI. The **backend** is a MERN (MongoDB + Express + React + Node) REST API for authentication, projects, and task management.

## ✨ Features

- 🕐 **Time-aware greeting** — dynamic "Good morning / afternoon / evening" header.
- 📊 **Dashboard stats grid** — Streak, Coding Time, Commits, and Tasks Done at a glance.
- 🔥 **GitHub Activity heatmap** — weekly contribution squares with a longest-streak summary.
- 📁 **Active Projects** — track project descriptions, status, and progress percentages.
- ✅ **Today's Tasks** — checkbox toggles, due-date pills, and project association.
- 🎯 **Daily Progress** — coding hours vs. goal with a visual line chart and completion ring.
- 🧭 **Custom Bottom Navigation** — Home, Tasks, Profile tabs plus an "Other" menu.
- ➕ **Floating Action Button (FAB)** — quick-add entry point.
- 🌙 **Dark theme UI** — modern, high-contrast design system.
- 🔐 **JWT Authentication** — register, login, and protected routes.

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|----------|
| [React Native](https://reactnative.dev) `0.85.3` | Cross-platform mobile framework |
| [React](https://react.dev) `19.2.3` | UI component library |
| [Jest](https://jestjs.io) | Unit testing framework |

### Backend
| Technology | Purpose |
|------------|----------|
| [Node.js](https://nodejs.org) | JavaScript runtime |
| [Express](https://expressjs.com) | Web framework |
| [MongoDB](https://mongodb.com) / [Mongoose](https://mongoosejs.com) | Database & ODM |
| [JWT](https://jwt.io) | Authentication |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing |

## 📁 Project Structure

```
DevTrack/
├── frontend/              # React Native mobile application (pure JS)
│   ├── android/           # Android native project
│   ├── ios/               # iOS native project
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── data/          # Mock data & types
│   │   ├── screens/       # Screens
│   │   ├── theme/         # Shared color palette
│   │   └── utils/         # Helper functions
│   ├── App.js             # App entry point
│   └── package.json
├── backend/               # MERN backend REST API
│   ├── config/            # Database connection
│   ├── models/            # Mongoose models
│   ├── controllers/       # Route controllers
│   ├── routes/            # API routes
│   ├── middleware/        # Auth & error middleware
│   ├── utils/             # Utilities
│   ├── server.js          # Backend entry point
│   └── package.json
└── web-frontend/          # (Planned) Web dashboard
```

## 🚀 Getting Started

### Frontend

Prerequisites: complete the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment).

```sh
cd frontend
npm install

# Android
npm run android

# iOS (first time: run `bundle install` then `bundle exec pod install`)
npm run ios
```

### Backend

Prerequisites: **Node.js** `>= 18` and **MongoDB** (local or Atlas).

```sh
cd backend
npm install
cp .env.example .env   # then edit values
npm run dev            # or npm start
```

The backend runs at **http://localhost:5000**.

## 🧪 Testing

### Frontend

```sh
cd frontend
npm test
npm run lint
```

## 🗺 Roadmap

- [x] **MERN backend** — REST API for auth, projects, and tasks.
- [ ] **Web dashboard** — web version of DevTrack.
- [ ] **Real GitHub integration** — pull actual contribution data from the GitHub API.
- [ ] **Frontend-backend integration** — connect the app to the API.
- [ ] **Profile & settings** — user preferences, themes, and goal configuration.

---

Made with ❤️ for developers who love tracking their progress.
