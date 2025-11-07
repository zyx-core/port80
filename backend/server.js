import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";








dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);




app.get("/", (req, res) => {
  res.send("Backend server is running successfully!");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// after app.use(express.json());
app.use("/api/students", studentRoutes);
