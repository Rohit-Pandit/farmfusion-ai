import api from "./api";


export const predictDisease = async (formData) => {
  const response = await api.post("/ai/predict", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
