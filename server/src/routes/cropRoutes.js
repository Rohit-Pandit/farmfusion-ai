import express from "express";

import {
  createCrop,
  getAllCrops,
} from "../controllers/cropController.js";

import {
  protect,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", getAllCrops);


router.post(
  "/",
  protect,
  authorizeRoles("farmer", "admin"),
  createCrop
);

export default router;