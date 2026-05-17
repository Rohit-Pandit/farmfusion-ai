import { getAllUsers } from "../controllers/adminController.js";
import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, authorizeRoles("admin"), getAllUsers);

export default router;