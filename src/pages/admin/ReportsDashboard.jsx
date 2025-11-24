import React, { useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getApiUrl } from "../../config/api";

import {
  Chart as ChartJS,
  BarElement, CategoryScale, LinearScale,
  ArcElement, Tooltip, Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const ReportsDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [report, setReport] = useState(null);

  // ✅ Corrected to POST (Backend requires POST)
  const generateReport = async () => {
    try {
      const res = await axios.post(
        getApiUrl("admin/report"),
        { startDate, endDate }, // Date Range can be optional
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReport(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load report");
    }
  };

  // ✅ Export to Excel
  const exportToExcel = () => {
    if (!report) return;

    const studentData = report.leaderboard.map((s) => ({
      Name: s.name,
      Email: s.email,
      Branch: s.branch,
      Year: s.year,
      MuLearn_Points: s.progress?.mulearn || 0,
      CodeChef_Rating: s.progress?.codechef || 0,
      LeetCode_Solved: s.progress?.leetcode || 0,
      GitHub_Repos: s.progress?.github || 0,
    }));

    const worksheet = XLSX.utils.json_to_sheet(studentData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "CodingClub_Report.xlsx");
  };

  return (
    <div style={{
      minHeight: "100vh",
      padding: "40px",
      background: "linear-gradient(135deg,#1e3a8a,#1e40af,#1e3a8a)",
      color: "white"
    }}>
      
      <h1 style={{ fontSize: "34px", marginBottom: "10px", fontWeight: "bold", textAlign:"center" }}>
        📊 Coding Club Progress Report
      </h1>

      {/* Date Filter UI */}
      <div style={{ display:"flex", justifyContent:"center", gap:"12px", marginBottom:"30px" }}>
        <input
          type="date"
          value={startDate}
          onChange={(e)=>setStartDate(e.target.value)}
          style={inputStyle}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e)=>setEndDate(e.target.value)}
          style={inputStyle}
        />
        <button onClick={generateReport} style={primaryButton}>
          Generate Report
        </button>
      </div>

      {report && (
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={card}>
            <h2 style={cardTitle}>Summary</h2>
            <p>Total Students: <strong>{report.stats.totalStudents}</strong></p>
            <p>Average MuLearn Points: <strong>{report.stats.avgMuLearn}</strong></p>
            <p>Average LeetCode Solved: <strong>{report.stats.avgLeetCode}</strong></p>
            <p>Average GitHub Repos: <strong>{report.stats.avgGitHub}</strong></p>
          </div>

          <div style={{ textAlign:"center", marginTop:"40px", display:"flex", justifyContent:"center", gap:"16px" }}>
            <button onClick={() => window.print()} style={printButton}>🖨 Print Report</button>
            <button onClick={exportToExcel} style={excelButton}>📥 Export to Excel</button>
          </div>
        </div>
      )}
    </div>
  );
};

/* Styles */
const inputStyle = {
  padding:"10px 14px",
  borderRadius:"8px",
  border:"1px solid #60a5fa",
  background:"rgba(255,255,255,0.2)",
  color:"white",
  outline:"none"
};

const primaryButton = {
  padding:"10px 22px",
  background:"#3b82f6",
  border:"none",
  borderRadius:"10px",
  color:"white",
  fontWeight:"600",
  cursor:"pointer"
};

const printButton = {
  padding:"12px 30px",
  background:"#10b981",
  border:"none",
  borderRadius:"12px",
  color:"white",
  fontWeight:"600",
  cursor:"pointer"
};

const excelButton = {
  padding:"12px 30px",
  background:"#2563eb",
  border:"none",
  borderRadius:"12px",
  color:"white",
  fontWeight:"600",
  cursor:"pointer"
};

const card = {
  background:"rgba(255,255,255,0.12)",
  padding:"20px",
  borderRadius:"18px"
};

const cardTitle = {
  fontSize:"22px",
  marginBottom:"10px",
  fontWeight:"bold",
  color:"#bfdbfe"
};

export default ReportsDashboard;
