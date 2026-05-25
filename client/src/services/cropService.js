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
};

export const getMyCrops = async () => {
  const response = await api.get(
    "/crops/my-crops"
  );

  return response.data;
};

export const deleteCrop = async (id) => {
  const response = await api.delete(
    `/crops/${id}`
  );

  return response.data;
};

export const getSingleCrop = async (id) => {
  const response = await api.get(
    `/crops/${id}`
  );

  return response.data;
};


export const updateCrop = async (
  id,
  formData
) => {
  const response = await api.put(
    `/crops/${id}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};