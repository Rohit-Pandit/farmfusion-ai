import Crop from "../models/Crop.js";
import asyncHandler from "../utils/asyncHandler.js";

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
      image : req.file ? req.file.path : "",
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
    
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const search = req.query.search || "";
    const category = req.query.category || "";
    const location = req.query.location || "";

    
    const query = {};

    
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    
    if (category) {
      query.category = category;
    }

    
    if (location) {
      query.location = location;
    }

    
    const skip = (page - 1) * limit;

    
    const crops = await Crop.find(query)
      .populate("farmer", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    
    const totalCrops = await Crop.countDocuments(query);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalCrops / limit),
      totalCrops,
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

export const getMyCrops = asyncHandler(async(req,res)=>{
  const crops = await Crop.find({farmer: req.user._id}).sort({createdAt: -1});

  res.status(200).json({
    success: true,
    count: crops.length,
    crops,
  });
});
