import { Router } from "express";
import router from "./user.routes";
import { authCallback } from "../controllers/auth.controller";
const route = Router();

router.post("/callback", authCallback);

export default route;
