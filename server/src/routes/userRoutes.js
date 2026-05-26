import express from "express";
import {toggleWishlist, getWishlist} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/wishlist", protect, getWishlist);
router.put("/wishlist/:id", protect, toggleWishlist);  


export default router;