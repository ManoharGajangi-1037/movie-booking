import { Router } from "express";
import { authenticate, authorizeAdmin } from "../middlewares/auth";
import { create } from "../controllers/screen.controller";

const router = Router();
router.post("/:theaterId/screens", authenticate, authorizeAdmin, create);

export default router;
