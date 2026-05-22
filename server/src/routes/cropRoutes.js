import express from "express";

import {
  createCrop,
  getAllCrops,
  getSingleCrop,
  updateCrop,
  deleteCrop,
  getMyCrops,
} from "../controllers/cropController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAllCrops);
router.get("/my-crops", protect, authorizeRoles("farmer", "admin"), getMyCrops);
router.get("/:id", getSingleCrop);
router.put("/:id", protect, authorizeRoles("farmer", "admin"), updateCrop);
router.delete("/:id", protect, authorizeRoles("farmer", "admin"), deleteCrop);
router.post("/", protect, authorizeRoles("farmer", "admin"), upload.single("image"), createCrop);

export default router;
