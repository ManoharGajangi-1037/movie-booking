import { Router } from "express";
import { authenticate, authorizeAdmin } from "../middlewares/auth";
import { createBulk } from "../controllers/seat.controller";

const router = Router();
router.post(":/screenId/seats/bulk", authenticate, authorizeAdmin, createBulk);
export default router;
