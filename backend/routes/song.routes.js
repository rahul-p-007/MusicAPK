import { Router } from "express";
import {
  getAllSongs,
  getMadeForYou,
  getTrendingSongs,
  getFeaturedSongs,
} from "../controllers/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const route = Router();
route.get("/", protectRoute, requireAdmin, getAllSongs);
route.get("/featured", getFeaturedSongs);
route.get("/made-for-you", getMadeForYou);
route.get("/trending", getTrendingSongs);

export default route;
