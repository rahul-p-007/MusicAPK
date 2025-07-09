import { Router } from "express";
import { authCallback } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const route = Router();

route.post("/callback", authCallback);

export default route;
