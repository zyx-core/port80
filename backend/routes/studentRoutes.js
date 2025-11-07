import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { 
  registerStudent, 
  loginStudent, 
  getStudentProfile, 
  updateProgress 
} from "../controllers/studentController.js";




const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.put("/progress", protect, updateProgress);
router.put("/progress", protect, updateProgress);

// Protected route example: get student profile
router.get("/profile", protect, async (req, res) => {
  res.json({
    message: "Profile fetched successfully",
    student: req.user,
  });
});


export default router;
