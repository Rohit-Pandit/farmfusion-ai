import User from "../models/User.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }   
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(error);   
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  } 
};

export { getAllUsers };