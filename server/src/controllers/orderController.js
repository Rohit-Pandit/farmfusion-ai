import asyncHandler from "../utils/asyncHandler.js";

import Order from "../models/Order.js";

import Crop from "../models/Crop.js";

const createOrder = asyncHandler(async (req, res) => {
  const { cropId, quantity } = req.body;

  const crop = await Crop.findById(cropId);

  if (!crop) {
    return res.status(404).json({
      success: false,
      message: "Crop not found",
    });
  }

  const totalPrice = crop.price * quantity;

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
});

const getBuyerOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    buyer: req.user._id,
  })
    .populate("crop")
    .populate("farmer", "name email");

  res.status(200).json({
    success: true,
    orders,
  });
});

const getFarmerOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    farmer: req.user._id,
  })
    .populate("crop")
    .populate("buyer", "name email");

  res.status(200).json({
    success: true,
    orders,
  });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  order.status = status;

  await order.save();

  res.status(200).json({
    success: true,
    order,
  });
});

const getFarmerAnalytics = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    farmer: req.user._id,
  });

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "pending",
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered",
  ).length;

  const totalRevenue = orders
    .filter((order) => order.status === "delivered")
    .reduce((acc, order) => acc + order.totalPrice, 0);

  res.status(200).json({
    success: true,

    analytics: {
      totalOrders,
      pendingOrders,
      deliveredOrders,
      totalRevenue,
    },
  });
});

export {
  createOrder,
  getBuyerOrders,
  getFarmerOrders,
  updateOrderStatus,
  getFarmerAnalytics,
};
