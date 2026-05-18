import express from "express";

import {
  createCrop,
  getAllCrops,
  getSingleCrop,
  updateCrop,
  deleteCrop,
} from "../controllers/cropController.js";

import {
  protect,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", getAllCrops);
router.get("/:id", getSingleCrop);
router.put("/:id", protect, authorizeRoles("farmer", "admin"), updateCrop);
router.delete("/:id", protect, authorizeRoles("farmer", "admin"), deleteCrop);  
router.post( "/",protect,authorizeRoles("farmer", "admin"),createCrop);

export default router;