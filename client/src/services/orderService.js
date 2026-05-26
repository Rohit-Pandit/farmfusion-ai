import api from "./api";

export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);

  return response.data;
};

export const getBuyerOrders = async () => {
  const response = await api.get("/orders/buyer");

  return response.data;
};

export const getFarmerOrders = async () => {
  const response = await api.get("/orders/farmer");

  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/orders/status/${id}`, { status });

  return response.data;
};
