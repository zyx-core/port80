// backend/routes/adminRoutes.js
import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAllStudents,
  deleteStudent,
  updateStudent,
  getDashboardStats,
  getSingleStudent,
  generateReport   // ✅ Make sure this is imported
} from "../controllers/adminController.js";

import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// ✅ FIXED REPORT ROUTE
router.post("/report", protectAdmin, generateReport);


// Dashboard
router.get("/dashboard", protectAdmin, getDashboardStats);

// Student management
router.get("/students", protectAdmin, getAllStudents);
router.get("/students/:id", protectAdmin, getSingleStudent);
router.put("/student/:id", protectAdmin, updateStudent);
router.delete("/student/:id", protectAdmin, deleteStudent);

export default router;
