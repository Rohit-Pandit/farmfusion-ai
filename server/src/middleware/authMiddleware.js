import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { JWT_SECRET } from "../config/env.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user.role}) is not allowed to access this resource`,
      });
    }

    next();
  };
};