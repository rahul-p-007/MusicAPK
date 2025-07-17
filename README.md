# 🎵 Full-Stack Music App

A modern full-stack music streaming platform built with React 19, Zustand, TailwindCSS, and Express.js. Includes features like real-time updates, Google authentication, and media uploads.

## 🚀 Features

* 🎷 Stream and manage music and albums
* 🢑 Google login with Clerk authentication
* 🔄 Real-time activity tracking via Socket.IO
* ☁️ Cloudinary-powered file uploads
* 🌐 Fully responsive, clean UI with TailwindCSS
* 📊 Zustand for global state management
* 🔒 Protected routes with React Router

## 🛠️ Tech Stack

### Frontend

* **React 19 + Vite**
* **Zustand** – Global state management
* **React Router** – Routing
* **TailwindCSS** – Styling
* **Lucide-react** – Icons
* **Socket.IO Client** – Real-time updates
* **Clerk** – Google Authentication

### Backend

* **Express.js**
* **MongoDB + Mongoose**
* **Socket.IO**
* **Cloudinary** – Media storage
* **dotenv, cors, file-upload** – Utilities
* **Clerk middleware** – Authentication

## 📂 Folder Structure

```
/frontend
  - React app with Tailwind + Zustand
/backend
  - Express API + MongoDB + Clerk + Cloudinary
```

## 🔧 Installation

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

# Environment Configuration - Music App Project

Use this `.env` template to set up your environment variables. Replace the values with your own secrets.

```env
MONGO_URI=
PORT=
ADMIN_EMAIL=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=
NODE_ENV=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
VITE_CLERK_PUBLISHABLE_KEY=

```


## 🧪 Scripts

```bash
npm run seed:songs    # Seed initial songs
npm run seed:albums   # Seed initial albums
```

## 📸 Screenshots


<img width="1914" height="932" alt="image" src="https://github.com/user-attachments/assets/41f084b2-0e93-4c1e-8495-b88eb6d18ca8" />

<img width="949" height="579" alt="image" src="https://github.com/user-attachments/assets/04d57c91-c6fd-4c43-aac9-6fc5c41a002d" />

<img width="1919" height="547" alt="image" src="https://github.com/user-attachments/assets/426be1fe-990f-4b8a-a393-d901a23d81d2" />

## 🌍 Live Demo

[[Click Here](https://musicapk-2.onrender.com)]
