// importing the modules
import express from "express";
import { clerkMiddleware } from "@clerk/express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import path from "path";
dotenv.config();

// importing the files
import { connectDb } from "./connection/connect_to_mongoDB.js";

// Routes
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import songRoutes from "./routes/song.routes.js";
import albumRoutes from "./routes/album.routes.js";
import statsRoutes from "./routes/stat.routes.js";
import { create } from "domain";

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(clerkMiddleware()); //this will add auth to req obj => req.auth.userId

// Middleware for handling file uploads in Express
app.use(
  fileUpload({
    // This sets where temporary files will be stored during the upload process.
    // However, `useTempFiles` should be a boolean. You're passing a path here, which is incorrect.
    // It should be:
    // useTempFiles: true,
    // tempFileDir: path.join(__dirname, "temp")
    useTempFiles: path.join(__dirname, "temp"),

    // Automatically creates the parent directory if it doesn't exist
    createParentPath: true,

    // Limit the maximum size of the uploaded file to 10 MB
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 megabytes in bytes
    },
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);
// error handler

app.use((err, req, res, next) => {
  res.status(500).json({
    error:
      process.env.NODE_ENV === "development"
        ? "Internal server error"
        : err.message,
  });
});
connectDb(app);
