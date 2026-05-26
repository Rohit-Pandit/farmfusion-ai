import api from "./api.js";

export const toggleWishlist = async (cropId) => {
  const response = await api.put(`/users/wishlist/${cropId}`);

  return response.data;
};

export const getWishlist = async () => {
  const response = await api.get("/users/wishlist");

  return response.data;
};
