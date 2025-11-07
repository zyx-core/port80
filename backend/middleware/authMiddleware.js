import jwt from "jsonwebtoken";
import Student from "../models/studentModel.js";
import Admin from "../models/adminModel.js"; // ✅ Add this import

// Protect Student Routes
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Student.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Student not found" });
      }

      next();
    } catch (error) {
      console.error("Student Auth Error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Protect Admin Routes
export const protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Authorization Header:", req.headers.authorization);
    console.log("Token String:", token);
    console.log("Decoded token:", decoded);


      req.admin = await Admin.findById(decoded.id).select("-password");
      console.log("Admin ID from token:", decoded.id);

      if (!req.admin) {
        return res.status(401).json({ message: "Admin not found" });
      }

      next();
    } catch (error) {
      console.error("Admin Auth Error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
