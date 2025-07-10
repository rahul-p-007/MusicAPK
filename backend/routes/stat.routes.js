import { Router } from "express";
import { getStats } from "../controllers/stat.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
const route = Router();
route.get("/", protectRoute, requireAdmin, getStats);
export default route;
