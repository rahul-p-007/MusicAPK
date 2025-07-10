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
// It will implemented to all of the route

route.use(protectRoute, requireAdmin);

route.get("/check", checkAdmin);

route.post("/songs", createSong);
route.delete("/songs/:id", deleteSong);
route.post("/albums", createAlbum);
route.delete("/albums/:id", deleteAlbum);
export default route;
