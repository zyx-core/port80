import Admin from "../models/adminModel.js";
import Student from "../models/studentModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Admin registered successfully", admin });
  } catch (error) {
    res.status(500).json({ message: "Error registering admin", error: error.message });
  }
};

// ✅ Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// ✅ Get All Students (Admin Only)
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-password");
    res.json({ count: students.length, students });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
};

// ✅ Update Student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, branch, year } = req.body;

    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.name = name || student.name;
    student.branch = branch || student.branch;
    student.year = year || student.year;

    await student.save();

    res.json({ message: "Student updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error: error.message });
  }
};

// ✅ Delete Student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    await student.deleteOne();

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const students = await Student.find();

    const totalStudents = students.length;

    // Calculate total score for ranking
    const rankedStudents = students
      .map(student => ({
        name: student.name,
        progress: student.progress,
        totalScore:
          (student.progress.mulearn || 0) +
          (student.progress.codechef || 0) +
          (student.progress.leetcode || 0) +
          (student.progress.github || 0)
      }))
      .sort((a, b) => b.totalScore - a.totalScore) // highest first
      .slice(0, 5); // top 5 performers

    res.status(200).json({
      message: "Dashboard stats fetched successfully",
      totalStudents,
      topPerformers: rankedStudents,
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats", error: error.message });
  }
};


export const getSingleStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select("-password");

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({ student });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error: error.message });
  }
};


//getreport


export const getReport = async (req, res) => {
  try {
    const students = await Student.find().select("name email branch year progress");
    res.status(200).json({ students });
  } catch (err) {
    res.status(500).json({ message: "Error generating report", error: err.message });
  }
};



// ✅ Admin Generate Full Report
export const generateReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const query = {};
    if (startDate && endDate) {
      query["progress.history.date"] = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const students = await Student.find(query).select("-password");

    const stats = {
      totalStudents: students.length,
      avgMuLearn: Math.round(students.reduce((a, s) => a + (s.progress?.mulearn || 0), 0) / students.length),
      avgLeetCode: Math.round(students.reduce((a, s) => a + (s.progress?.leetcode || 0), 0) / students.length),
      avgGitHub: Math.round(students.reduce((a, s) => a + (s.progress?.github || 0), 0) / students.length),
    };

    // Leaderboard (Top 5 by LeetCode solves)
    const leaderboard = [...students]
      .sort((a, b) => (b.progress?.leetcode || 0) - (a.progress?.leetcode || 0))
      .slice(0, 5);

    res.json({ stats, students, leaderboard });

  } catch (err) {
    res.status(500).json({ message: "Report generation failed", error: err.message });
  }
};