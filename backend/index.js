import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDb } from "./connection/connect_to_mongoDB.js";

const app = express();

connectDb(app);
