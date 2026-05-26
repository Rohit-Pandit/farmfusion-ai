import React, { useEffect, useState, useContext } from "react";

import { useParams } from "react-router-dom";

import AuthContext from "../context/AuthContext.js";

import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout.jsx";

import { getSingleCrop } from "../services/cropService.js";

import { createOrder } from "../services/orderService.js";

import { useNavigate } from "react-router-dom";

const CropDetails = () => {
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const [crop, setCrop] = useState(null);

  const [loading, setLoading] = useState(true);

  const handleOrder = async () => {
    try {
      await createOrder({
        cropId: crop._id,
        quantity,
      });

      toast.success("Order placed successfully");
      setTimeout(() => {
  navigate("/buyer-orders");
}, 1200);
    } catch (error) {
      console.error(error);

      toast.error("Failed to place order");
    }
  };

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const data = await getSingleCrop(id);

        setCrop(data.crop);
      } catch (error) {
        console.error(error);

        toast.error("Failed to load crop");
      } finally {
        setLoading(false);
      }
    };

    fetchCrop();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  if (!crop) {
    return <div className="text-center mt-10 text-xl">Crop not found</div>;
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow-md">
        <div>
          <img
            src={crop.image || "https://placehold.co/600x400?text=farmfusion"}
            alt={crop.title}
            className="w-full h-[450px] object-cover rounded-xl"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{crop.title}</h1>

          <p className="text-gray-600 mb-6">{crop.description}</p>

          <div className="space-y-3 text-lg">
            <p>
              <span className="font-semibold">Price:</span> ₹{crop.price}
            </p>

            <p>
              <span className="font-semibold">Quantity:</span> {crop.quantity}{" "}
              kg
            </p>

            <p>
              <span className="font-semibold">Category:</span> {crop.category}
            </p>

            <p>
              <span className="font-semibold">Location:</span> {crop.location}
            </p>

            <p>
              <span className="font-semibold">Farmer:</span> {crop.farmer?.name}
            </p>
          </div>

          
          {user && user.user.role === "buyer" && (
            <>
              <div className="mt-6">
                <label className="font-semibold">Quantity (kg)</label>

                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full border p-3 rounded-lg mt-2"
                />
              </div>
              <button
                onClick={handleOrder}
                className="mt-6 bg-emerald-700 text-white px-8 py-3 rounded-lg hover:bg-emerald-800 transition w-full"
              >
                Place Order
              </button>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CropDetails;
