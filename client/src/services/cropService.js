import api from "./api.js";

export const getAllCrops = async () => {
  const response = await api.get("/crops");

  return response.data;
};