import Crop from "../models/Crop.js";

export const createCrop = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      quantity,
      category,
      location,
      image,
    } = req.body;

    const crop = await Crop.create({
      title,
      description,
      price,
      quantity,
      category,
      location,
      image,
      farmer: req.user._id,
    });

    if (!crop) {
      return res.status(400).json({
        success: false,
        message: "Failed to create crop",
      });
    }   

    res.status(201).json({
      success: true,
      message: "Crop created successfully",
      crop,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find()
      .populate("farmer", "name email")
      .sort({ createdAt: -1 });

      if (!crops) {
        return res.status(404).json({
          success: false,
          message: "No crops found",
        });
      }

    res.status(200).json({
      success: true,
      count: crops.length,
      crops,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};