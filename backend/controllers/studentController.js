import Student from "../models/studentModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER STUDENT
export const registerStudent = async (req, res) => {
  try {
    const { name, email, password, branch, year } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: "Student already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      branch,
      year
    });

    res.status(201).json({ message: "Student registered successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN STUDENT
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "Login successful",
      token,
      student: { id: student._id, name: student.name, email: student.email }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateProgress = async (req, res) => {
  try {
    const { mulearn, codechef, leetcode, github, comment } = req.body;
    const student = await Student.findById(req.user._id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // ✅ Ensure progress field exists
    if (!student.progress) {
      student.progress = {};
    }

    if (mulearn !== undefined) student.progress.mulearn = mulearn;
    if (codechef !== undefined) student.progress.codechef = codechef;
    if (leetcode !== undefined) student.progress.leetcode = leetcode;
    if (github !== undefined) student.progress.github = github;

    // ✅ Store student's comment with date stamp
    if (comment && comment.trim() !== "") {
      if (!student.progress.history) student.progress.history = [];

      student.progress.history.push({
        comment,
        date: new Date()
      });
    }

    await student.save();

    res.status(200).json({
      message: "Progress updated successfully ✅",
      progress: student.progress,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating progress", error: error.message });
  }
};


// ✅ Get Student Profile (Protected)
export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).select("-password");
    res.status(200).json({
      message: "Profile fetched successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};