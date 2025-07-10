import { Router } from "express";
import {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
  checkAdmin,
} from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const route = Router();

route.get("/check", protectRoute, requireAdmin, checkAdmin);

route.post("/songs", protectRoute, requireAdmin, createSong);
route.delete("/songs/:id", protectRoute, requireAdmin, deleteSong);
route.post("/albums", protectRoute, requireAdmin, createAlbum);
route.delete("/albums/:id", protectRoute, requireAdmin, deleteAlbum);
export default route;
