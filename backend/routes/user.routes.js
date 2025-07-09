import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("HNN");
});

export default router;
