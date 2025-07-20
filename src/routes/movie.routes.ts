import { Router } from "express";
import { authenticate, authorizeAdmin } from "../middlewares/auth";
import { create } from "../controllers/movie.controller";

const router = Router();
router.post("/", authenticate, authorizeAdmin, create);
export default router;
