import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout.jsx";

import { getBuyerOrders } from "../services/orderService.js";

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getBuyerOrders();

        setOrders(data.orders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold mb-8">My Orders 📦</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold">{order.crop.title}</h2>

            <p className="mt-2">Quantity: {order.quantity} kg</p>

            <p>Total: ₹{order.totalPrice}</p>

            <p>Farmer: {order.farmer.name}</p>

            <p className="mt-3">
              Status:
              <span
                className={`ml-2 font-semibold capitalize px-3 py-1 rounded-full text-white
                                ${
                                    order.status === "pending"
                                    ? "bg-yellow-500"
                                    : order.status === "accepted"
                                        ? "bg-blue-500"
                                        : order.status === "rejected"
                                        ? "bg-red-500"
                                        : order.status === "delivered"
                                            ? "bg-green-600"
                                            : "bg-gray-500"
                                }
                     `}
                >
              {order.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default BuyerOrders;
