import api from "./api.js";

export const getAllCrops = async (search = "", category = "") => {
  const response = await api.get(`/crops?search=${search}&category=${category }`);

  return response.data;
};
