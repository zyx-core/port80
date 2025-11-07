// backend/routes/adminRoutes.js
import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAllStudents,
  deleteStudent,
  updateStudent,
} from "../controllers/adminController.js";

import { protectAdmin } from "../middleware/authMiddleware.js";
import { getDashboardStats } from "../controllers/adminController.js";
import { getSingleStudent } from "../controllers/adminController.js";


const router = express.Router();

// ✅ Auth Routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

router.get("/dashboard", protectAdmin, getDashboardStats);
// ✅ Admin-Protected Student Management Routes
router.get("/students", protectAdmin, getAllStudents);
router.delete("/student/:id", protectAdmin, deleteStudent);
router.put("/student/:id", protectAdmin, updateStudent);
router.get("/students/:id", protectAdmin, getSingleStudent);
export default router;
