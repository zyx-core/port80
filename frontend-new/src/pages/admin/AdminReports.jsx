import React, { useState } from "react";
import axios from "axios";

const AdminReports = () => {
  const token = localStorage.getItem("adminToken");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/admin/report", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStudents(res.data.students || []);
    } catch (err) {
      alert("Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
        📄 Student Progress Report
      </h1>

      <button
        onClick={generateReport}
        style={{
          background: "#4f46e5",
          padding: "12px 24px",
          borderRadius: "8px",
          border: "none",
          color: "white",
          cursor: "pointer",
          marginRight: "16px"
        }}
      >
        Generate Report
      </button>

      <button
        onClick={printReport}
        style={{
          background: "#10b981",
          padding: "12px 24px",
          borderRadius: "8px",
          border: "none",
          color: "white",
          cursor: "pointer"
        }}
      >
        Print
      </button>

      {loading && <p style={{ marginTop: "20px" }}>Loading...</p>}

      <div style={{ marginTop: "30px" }}>
        {students.length === 0 ? (
          <p>No report generated yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={th}>Name</th>
                <th style={th}>Branch</th>
                <th style={th}>Year</th>
                <th style={th}>MuLearn</th>
                <th style={th}>CodeChef</th>
                <th style={th}>LeetCode</th>
                <th style={th}>GitHub</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td style={td}>{s.name}</td>
                  <td style={td}>{s.branch}</td>
                  <td style={td}>{s.year}</td>
                  <td style={td}>{s.progress?.mulearn || 0}</td>
                  <td style={td}>{s.progress?.codechef || 0}</td>
                  <td style={td}>{s.progress?.leetcode || 0}</td>
                  <td style={td}>{s.progress?.github || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const th = {
  padding: "12px",
  borderBottom: "1px solid #93c5fd",
  textAlign: "left"
};

const td = {
  padding: "12px",
  borderBottom: "1px solid rgba(255,255,255,0.2)"
};

export default AdminReports;
