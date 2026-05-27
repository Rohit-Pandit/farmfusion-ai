import express from "express";

import { predictDisease } from "../controllers/aiController.js";

import {protect} from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/predict", protect, upload.single("image"), predictDisease);

export default router;
