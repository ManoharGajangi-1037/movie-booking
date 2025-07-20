import { Router } from "express";
import { authenticate, authorizeAdmin } from "../middlewares/auth";
import { create } from "../controllers/theater.controller";

const router = Router();
router.post("/theater", authenticate, authorizeAdmin, create);
export default router;
