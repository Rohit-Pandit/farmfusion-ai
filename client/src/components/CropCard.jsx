import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toggleWishlist } from "../services/userService.js";
import AuthContext from "../context/AuthContext.js";
import toast from "react-hot-toast";

const CropCard = ({ crop, onWishlistRemove }) => {
  const { user, wishlist, setWishlist } = React.useContext(AuthContext);

  const wishlistedCrop = wishlist.includes(crop._id);

  const handleWishlist = async () => {
    try {
      await toggleWishlist(crop._id);

      if (wishlistedCrop) {
        setWishlist((prev) => prev.filter((id) => id !== crop._id));

        toast.success("Removed from wishlist");

        if (onWishlistRemove) {
          onWishlistRemove(crop._id);
        }
      } else {
        setWishlist((prev) => [...prev, crop._id]);

        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error(error);

      toast.error("Failed to update wishlist");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={crop.image || "https://placehold.co/600x400?text=FarmFusion"}
        alt={crop.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{crop.title}</h2>

        <p className="text-gray-600 mb-3">{crop.description}</p>

        <div className="space-y-1 text-gray-700">
          <p>
            <span className="font-semibold">Price:</span> ₹{crop.price}
          </p>

          <p>
            <span className="font-semibold">Quantity:</span> {crop.quantity} kg
          </p>

          <p>
            <span className="font-semibold">Category:</span> {crop.category}
          </p>

          <p>
            <span className="font-semibold">Location:</span> {crop.location}
          </p>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Farmer: {crop.farmer?.name}
        </div>
      </div>

      {user?.user?.role === "buyer" && (
        <button
          onClick={handleWishlist}
          className={`w-full mt-3 py-2 rounded-lg transition border
      ${
        wishlistedCrop
          ? "bg-red-400 text-white border-red-500 hover:bg-red-600"
          : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
      }
    `}
        >
          {wishlistedCrop ? "💔 Remove Wishlist" : "💚 Add Wishlist"}
        </button>
      )}

      <Link to={`/crops/${crop._id}`}>
        <button className="w-full mt-4 bg-emerald-700 text-white py-2 rounded-lg hover:bg-emerald-800 transition">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default CropCard;
