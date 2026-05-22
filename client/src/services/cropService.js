import api from "./api.js";

export const getAllCrops = async (search = "", category = "") => {
  const response = await api.get(`/crops?search=${search}&category=${category }`);

  return response.data;
};


export  const createCrop = async (formData) => {
    const response  = await api.post("/crops", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}