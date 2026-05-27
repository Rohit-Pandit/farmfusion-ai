import asyncHandler from "../utils/asyncHandler.js";
import axios from "axios";

export const predictDisease = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image is required",
    });
  }

  try {
    console.log("REQ FILE:", req.file);

    const imageUrl = req.file.path;

    console.log("IMAGE URL:", imageUrl);

    const response = await axios({
      method: "post",

      url: "http://127.0.0.1:8000/predict",

      data: {
        imageUrl: imageUrl,
      },

      headers: {
        "Content-Type": "application/json",
      },
    });

    res.status(200).json({
      success: true,
      prediction: response.data,
    });
  } catch (error) {
    console.error(error.response?.data || error);

    res.status(500).json({
      success: false,
      message: "AI prediction failed",
    });
  }
});
