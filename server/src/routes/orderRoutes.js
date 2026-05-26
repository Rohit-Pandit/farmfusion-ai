import express from "express";

import { createOrder, getBuyerOrders, getFarmerOrders, updateOrderStatus} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/buyer", protect, getBuyerOrders);
router.get("/farmer", protect, getFarmerOrders);
router.put("/status/:id", protect, updateOrderStatus);
export default router;
