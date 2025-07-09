import { Router } from "express";
import { createSong } from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const route = Router();

route.post("/", protectRoute, requireAdmin, createSong);

export default route;
