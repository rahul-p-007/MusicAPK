import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectionString = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

export const connectDb = async (app) => {
  try {
    if (!connectionString) {
      throw new Error("MONGO_URI is undefined");
    }

    await mongoose.connect(connectionString, {
      dbName: "MusicAPK",
    });

    console.log("✅ Database is connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Connection error:", error.message);
    process.exit(1);
  }
};
