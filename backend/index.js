// importing the modules
import express from "express";
import { clerkMiddleware } from "@clerk/express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import { createServer } from "http";
dotenv.config();
import fs from "fs";
import cron from "node-cron";

import { initializeSocket } from "./lib/socket.js";
// importing the files
import { connectDb } from "./connection/connect_to_mongoDB.js";

const tempDir = path.join(process.cwd(), "temp");

cron.schedule("0 * * * *", () => console.log("running a task every minute"));

if (fs.existsSync(tempDir)) {
  // fs.rmSync(tempDir, { recursive: true, force: true });
  fs.readdir(tempDir, (err, files) => {
    if (err) {
      console.log("error", err);
      return;
    }
    for (const file of files) {
      fs.unlinkSync(path.join(tempDir, file), (err) => {});
    }
  });
}

// Routes
// import userRoutes from "./routes/user.routes.js";
// import authRoutes from "./routes/auth.routes.js";
// import adminRoutes from "./routes/admin.routes.js";
// import songRoutes from "./routes/song.routes.js";
// import albumRoutes from "./routes/album.routes.js";
// import statsRoutes from "./routes/stat.routes.js";

const app = express();
const __dirname = path.resolve();
const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware()); //this will add auth to req obj => req.auth.userId

// Middleware for handling file uploads in Express

app.use(
  fileUpload({
    useTempFiles: true, // ✅ This tells express-fileupload to use the filesystem for temporary files
    tempFileDir: path.join(__dirname, "temp"), // ✅ Directory where those files will be stored
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB
    },
  })
);

// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/songs", songRoutes);
// app.use("/api/albums", albumRoutes);
// app.use("/api/stats", statsRoutes);
// error handler

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

app.use((err, req, res, next) => {
  res.status(500).json({
    error:
      process.env.NODE_ENV === "development"
        ? "Internal server error"
        : err.message,
  });
});
connectDb(httpServer);
