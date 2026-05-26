import asyncHandler from "../utils/asyncHandler.js";

import Order from "../models/Order.js";

import Crop from "../models/Crop.js";

 const createOrder = asyncHandler(
  async (req, res) => {
    const { cropId, quantity } =
      req.body;

    const crop = await Crop.findById(
      cropId
    );

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    const totalPrice =
      crop.price * quantity;

    const order = await Order.create({
      buyer: req.user._id,

      farmer: crop.farmer,

      crop: crop._id,

      quantity,

      totalPrice,
    });

    res.status(201).json({
      success: true,
      order,
    });
  }
);

export { createOrder };