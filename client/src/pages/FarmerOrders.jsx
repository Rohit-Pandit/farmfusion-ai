import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout.jsx";

import { getFarmerOrders, updateOrderStatus } from "../services/orderService.js";

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getFarmerOrders();

        setOrders(data.orders);
      } catch (error) {
        console.error(error);

        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateOrderStatus(id, status);


      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id
            ? {
                ...order,
                status,
              }
            : order,
        ),
      );

      toast.success(`Order ${status}`);
    } catch (error) {
      console.error(error);

      toast.error("Failed to update order");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";

      case "accepted":
        return "bg-blue-500";

      case "rejected":
        return "bg-red-500";

      case "delivered":
        return "bg-green-600";

      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold mb-8">Incoming Orders 🚜</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No incoming orders yet.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left */}
                <div>
                  <h2 className="text-2xl font-bold">{order.crop.title}</h2>

                  <p className="mt-2">Buyer: {order.buyer.name}</p>

                  <p>Quantity: {order.quantity} kg</p>

                  <p>Total: ₹{order.totalPrice}</p>

                  {/* Status */}
                  <div className="mt-4">
                    <span
                      className={`text-white px-4 py-1 rounded-full capitalize font-semibold ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleStatusUpdate(order._id, "accepted")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleStatusUpdate(order._id, "rejected")}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => handleStatusUpdate(order._id, "delivered")}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Deliver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default FarmerOrders;
