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

export const getSingleCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id).populate(
      "farmer",
      "name email"
    );

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    res.status(200).json({
      success: true,
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

export const updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    if (
      crop.farmer.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this crop",
      });
    }

    const updatedCrop = await Crop.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Crop updated successfully",
      crop: updatedCrop,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    if (
      crop.farmer.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this crop",
      });
    }

    await crop.deleteOne();

    res.status(200).json({
      success: true,
      message: "Crop deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};