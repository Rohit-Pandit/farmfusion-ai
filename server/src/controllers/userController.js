import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";

export const toggleWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const cropId = req.params.id;

  const exists = user.wishlist.includes(cropId);

  if (exists) {
    user.wishlist = user.wishlist.filter((id) => id.toString() !== cropId);
  } else {
    user.wishlist.push(cropId);
  }

  await user.save();

  res.status(200).json({
    success: true,
    wishlist: user.wishlist,
  });
});

export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");

  res.status(200).json({
    success: true,
    wishlist: user.wishlist,
  });
});
