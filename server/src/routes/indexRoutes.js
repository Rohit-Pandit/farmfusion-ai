import express from "express";
import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";
import cropRoutes from "./cropRoutes.js";
import orderRoutes from "./orderRoutes.js";
import userRoutes from "./userRoutes.js";
import aiRoutes from "./aiRoutes.js";


const router = express.Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/crops", cropRoutes);
router.use("/orders", orderRoutes);
router.use("/users", userRoutes);
router.use("/ai", aiRoutes);

export default router;