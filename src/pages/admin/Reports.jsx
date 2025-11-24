import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../config/api";

const Reports = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [mode, setMode] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    if (!token) {
      alert("Admin not logged in");
      return;
    }
    setLoading(true);
    setReport(null);

    try {
      const res = await axios.post(
        getApiUrl("admin/report"),
        { startDate, endDate, mode },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReport(res.data);
    } catch (err) {
      console.error("Report error:", err?.response?.data || err.message);
      alert("Failed to load report (check that /api/admin/report exists and uses POST).");
    } finally {
      setLoading(false);
    }
  };

  const printPage = () => window.print();

  const rows = report?.students || report?.leaderboard || [];

  return (
    <>
      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          
          #printable-area,
          #printable-area * {
            visibility: visible;
          }
          
          #printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            padding: 40px !important;
          }
          
          .no-print {
            display: none !important;
          }
          
          .print-header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #1d4ed8;
            padding-bottom: 20px;
          }
          
          .print-logo {
            font-size: 48px;
            margin-bottom: 10px;
          }
          
          .print-title {
            font-size: 28px;
            font-weight: bold;
            color: #1e3a8a;
            margin-bottom: 5px;
          }
          
          .print-subtitle {
            font-size: 16px;
            color: #64748b;
          }
          
          .print-date {
            text-align: right;
            color: #64748b;
            font-size: 14px;
            margin-bottom: 20px;
          }
          
          .print-summary {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 30px;
            page-break-inside: avoid;
          }
          
          .print-stat-card {
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            background: #f8fafc;
          }
          
          .print-stat-label {
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
            margin-bottom: 8px;
            font-weight: 600;
          }
          
          .print-stat-value {
            font-size: 24px;
            font-weight: bold;
            color: #1e3a8a;
          }
          
          .print-table-container {
            margin-top: 20px;
          }
          
          .print-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
          }
          
          .print-table thead {
            background: #1e3a8a;
            color: white;
          }
          
          .print-table th {
            padding: 12px 8px;
            text-align: left;
            font-weight: 600;
            border: 1px solid #cbd5e1;
          }
          
          .print-table td {
            padding: 10px 8px;
            border: 1px solid #cbd5e1;
            color: #1e293b;
          }
          
          .print-table tbody tr:nth-child(even) {
            background: #f8fafc;
          }
          
          .print-table tbody tr:nth-child(odd) {
            background: white;
          }
          
          .print-footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
            border-top: 2px solid #e2e8f0;
            padding-top: 20px;
          }
          
          .print-signature {
            margin-top: 60px;
            display: flex;
            justify-content: space-between;
            padding: 0 40px;
          }
          
          .print-signature-line {
            text-align: center;
          }
          
          .print-signature-line::before {
            content: "";
            display: block;
            width: 200px;
            border-top: 2px solid #1e3a8a;
            margin-bottom: 10px;
          }
          
          @page {
            margin: 1cm;
          }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1e3a8a 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
        padding: '40px 20px'
      }}>
        {/* Decorative Background Elements */}
        <div className="no-print" style={{
          position: 'absolute',
          top: '80px',
          left: '128px',
          width: '256px',
          height: '256px',
          background: 'rgba(59, 130, 246, 0.2)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}></div>
        
        <div className="no-print" style={{
          position: 'absolute',
          top: '240px',
          right: '160px',
          width: '288px',
          height: '288px',
          background: 'rgba(96, 165, 250, 0.15)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}></div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* Header Card - No Print */}
          <div className="no-print" style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                position: 'relative'
              }}>
                <div style={{ fontSize: '32px' }}>📄</div>
                <div style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: '#f59e0b',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}>⚡</div>
              </div>
              <div>
                <h1 style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '4px',
                  margin: 0
                }}>
                  Student Progress Report
                </h1>
                <p style={{
                  color: '#93c5fd',
                  fontSize: '14px',
                  margin: 0
                }}>
                  Select date range and generate comprehensive reports
                </p>
              </div>
            </div>
            
            <button
              onClick={() => navigate("/admin/dashboard")}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ← Back to Dashboard
            </button>
          </div>

          {/* Controls Card - No Print */}
          <div className="no-print" style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '24px',
              margin: '0 0 24px 0'
            }}>
              🔧 Report Configuration
            </h2>

            {/* Report Type */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                color: '#e0e7ff',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '12px'
              }}>
                Report Type
              </label>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '14px'
                }}>
                  <input
                    type="radio"
                    name="mode"
                    value="1"
                    checked={mode === "1"}
                    onChange={(e) => setMode(e.target.value)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span>Latest Progress</span>
                </label>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '14px',
                  opacity: 0.7
                }}>
                  <input
                    type="radio"
                    name="mode"
                    value="2"
                    checked={mode === "2"}
                    onChange={(e) => setMode(e.target.value)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span>Full History (if backend supports)</span>
                </label>
              </div>
            </div>

            {/* Date Range */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  color: '#e0e7ff',
                  fontSize: '14px',
                  fontWeight: 500,
                  marginBottom: '8px'
                }}>
                  From Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    colorScheme: 'dark'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid rgba(96, 165, 250, 0.5)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: '#e0e7ff',
                  fontSize: '14px',
                  fontWeight: 500,
                  marginBottom: '8px'
                }}>
                  To Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    colorScheme: 'dark'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid rgba(96, 165, 250, 0.5)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={generateReport}
                disabled={loading}
                style={{
                  background: loading ? '#1e40af' : '#1d4ed8',
                  color: 'white',
                  fontWeight: 600,
                  padding: '12px 32px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s',
                  fontSize: '15px',
                  opacity: loading ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.background = '#1e40af';
                    e.target.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.background = '#1d4ed8';
                    e.target.style.transform = 'scale(1)';
                  }
                }}
              >
                {loading ? "⏳ Generating..." : "📊 Generate Report"}
              </button>

              {report && (
                <button
                  onClick={printPage}
                  style={{
                    background: '#10b981',
                    color: 'white',
                    fontWeight: 600,
                    padding: '12px 32px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s',
                    fontSize: '15px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#059669';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#10b981';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  🖨 Print Report
                </button>
              )}
            </div>
          </div>

          {/* Loading State - No Print */}
          {loading && (
            <div className="no-print" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              borderRadius: '24px',
              padding: '48px',
              textAlign: 'center',
              color: '#bfdbfe',
              fontSize: '18px'
            }}>
              Loading report data...
            </div>
          )}

          {/* Printable Area */}
          {report && (
            <div id="printable-area">
              {/* Print Header */}
              <div className="print-header">
                <div className="print-logo">📄</div>
                <div className="print-title">Coding Club - Student Progress Report</div>
                <div className="print-subtitle">Comprehensive Performance Analysis</div>
              </div>

              <div className="print-date">
                Generated on: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                {startDate && endDate && (
                  <div>Period: {startDate} to {endDate}</div>
                )}
              </div>

              {/* Summary Section */}
              <div className="print-summary">
                <div className="print-stat-card">
                  <div className="print-stat-label">Total Students</div>
                  <div className="print-stat-value">{report?.stats?.totalStudents ?? rows.length}</div>
                </div>
                <div className="print-stat-card">
                  <div className="print-stat-label">Avg MuLearn Points</div>
                  <div className="print-stat-value">{report?.stats?.avgMuLearn ?? 0}</div>
                </div>
                <div className="print-stat-card">
                  <div className="print-stat-label">Avg LeetCode Solved</div>
                  <div className="print-stat-value">{report?.stats?.avgLeetCode ?? 0}</div>
                </div>
                <div className="print-stat-card">
                  <div className="print-stat-label">Avg GitHub Repos</div>
                  <div className="print-stat-value">{report?.stats?.avgGitHub ?? 0}</div>
                </div>
              </div>

              {/* Table Section */}
              <div className="print-table-container">
                <table className="print-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Branch</th>
                      <th>Year</th>
                      <th style={{ textAlign: 'center' }}>MuLearn</th>
                      <th style={{ textAlign: 'center' }}>CodeChef</th>
                      <th style={{ textAlign: 'center' }}>LeetCode</th>
                      <th style={{ textAlign: 'center' }}>GitHub</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((s, index) => (
                      <tr key={s._id}>
                        <td>{s.name}</td>
                        <td>{s.email}</td>
                        <td>{s.branch}</td>
                        <td style={{ textAlign: 'center' }}>{s.year}</td>
                        <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{s.progress?.mulearn ?? 0}</td>
                        <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{s.progress?.codechef ?? 0}</td>
                        <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{s.progress?.leetcode ?? 0}</td>
                        <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{s.progress?.github ?? 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Signature Section */}
              <div className="print-signature">
                <div className="print-signature-line">
                  <strong>Admin Signature</strong>
                </div>
                <div className="print-signature-line">
                  <strong>Faculty Advisor</strong>
                </div>
              </div>

              {/* Footer */}
              <div className="print-footer">
                <p><strong>Coding Club Management System</strong></p>
                <p>This is a computer-generated report. No signature is required.</p>
              </div>

              {/* Screen View - Styled Cards (No Print) */}
              <div className="no-print">
                {/* Summary Card */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  borderRadius: '24px',
                  padding: '32px',
                  marginBottom: '24px'
                }}>
                  <h2 style={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: '24px',
                    margin: '0 0 24px 0',
                    textAlign: 'center'
                  }}>
                    📈 Summary Statistics
                  </h2>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px'
                  }}>
                    <div style={{
                      background: 'rgba(96, 165, 250, 0.1)',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid rgba(96, 165, 250, 0.2)',
                      textAlign: 'center'
                    }}>
                      <div style={{ color: '#93c5fd', fontSize: '14px', marginBottom: '8px' }}>Total Students</div>
                      <div style={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
                        {report?.stats?.totalStudents ?? rows.length}
                      </div>
                    </div>

                    <div style={{
                      background: 'rgba(96, 165, 250, 0.1)',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid rgba(96, 165, 250, 0.2)',
                      textAlign: 'center'
                    }}>
                      <div style={{ color: '#93c5fd', fontSize: '14px', marginBottom: '8px' }}>Avg MuLearn</div>
                      <div style={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
                        {report?.stats?.avgMuLearn ?? 0}
                      </div>
                    </div>

                    <div style={{
                      background: 'rgba(96, 165, 250, 0.1)',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid rgba(96, 165, 250, 0.2)',
                      textAlign: 'center'
                    }}>
                      <div style={{ color: '#93c5fd', fontSize: '14px', marginBottom: '8px' }}>Avg LeetCode</div>
                      <div style={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
                        {report?.stats?.avgLeetCode ?? 0}
                      </div>
                    </div>

                    <div style={{
                      background: 'rgba(96, 165, 250, 0.1)',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid rgba(96, 165, 250, 0.2)',
                      textAlign: 'center'
                    }}>
                      <div style={{ color: '#93c5fd', fontSize: '14px', marginBottom: '8px' }}>Avg GitHub</div>
                      <div style={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
                        {report?.stats?.avgGitHub ?? 0}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table Card */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  borderRadius: '24px',
                  padding: '32px',
                  overflow: 'hidden'
                }}>
                  <h2 style={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: '24px',
                    margin: '0 0 24px 0',
                    textAlign: 'center'
                  }}>
                    📋 Detailed Student Data
                  </h2>

                  <div style={{ overflowX: 'auto' }}>
                    <table style={{
                      width: '100%',
                      borderCollapse: 'separate',
                      borderSpacing: '0 8px'
                    }}>
                      <thead>
                        <tr>
                          <th style={{
                            padding: '16px',
                            textAlign: 'left',
                            color: '#bfdbfe',
                            fontSize: '14px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>Name</th>
                          <th style={{
                            padding: '16px',
                            textAlign: 'left',
                            color: '#bfdbfe',
                            fontSize: '14px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>Email</th>
                          <th style={{
                            padding: '16px',
                            textAlign: 'left',
                            color: '#bfdbfe',
                            fontSize: '14px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>Branch</th>
                          <th style={{
                            padding: '16px',
                            textAlign: 'center',
                            color: '#bfdbfe',
                            fontSize: '14px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>Year</th>
                          <th style={{
                            padding: '16px',
                            textAlign: 'center',
                            color: '#bfdbfe',
                            fontSize: '14px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>MuLearn</th>
                          <th style={{
                            padding: '16px',
                            textAlign: 'center',
                            color: '#bfdbfe',
                            fontSize: '14px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>CodeChef</th>
                          <th style={{
                            padding: '16px',
                            textAlign: 'center',
                            color: '#bfdbfe',
                            fontSize: '14px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>LeetCode</th>
                          <th style={{
                            padding: '16px',
                            textAlign: 'center',
                            color: '#bfdbfe',
                            fontSize: '14px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>GitHub</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((s) => (
                          <tr key={s._id} style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.transform = 'scale(1.01)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}>
                            <td style={{
                              padding: '16px',
                              color: 'white',
                              fontSize: '14px',
                              borderTopLeftRadius: '12px',
                              borderBottomLeftRadius: '12px'
                            }}>{s.name}</td>
                            <td style={{
                              padding: '16px',
                              color: '#93c5fd',
                              fontSize: '14px'
                            }}>{s.email}</td>
                            <td style={{
                              padding: '16px',
                              color: 'white',
                              fontSize: '14px'
                            }}>{s.branch}</td>
                            <td style={{
                              padding: '16px',
                              color: 'white',
                              fontSize: '14px',
                              textAlign: 'center'
                            }}>{s.year}</td>
                            <td style={{
                              padding: '16px',
                              color: 'white',
                              fontSize: '14px',
                              textAlign: 'center',
                              fontWeight: '600'
                            }}>{s.progress?.mulearn ?? 0}</td>
                            <td style={{
                              padding: '16px',
                              color: 'white',
                              fontSize: '14px',
                              textAlign: 'center',
                              fontWeight: '600'
                            }}>{s.progress?.codechef ?? 0}</td>
                            <td style={{
                              padding: '16px',
                              color: 'white',
                              fontSize: '14px',
                              textAlign: 'center',
                              fontWeight: '600'
                            }}>{s.progress?.leetcode ?? 0}</td>
                            <td style={{
                              padding: '16px',
                              color: 'white',
                              fontSize: '14px',
                              textAlign: 'center',
                              fontWeight: '600',
                              borderTopRightRadius: '12px',
                              borderBottomRightRadius: '12px'
                            }}>{s.progress?.github ?? 0}</td>
                          </tr>
                        ))}

                        {rows.length === 0 && (
                          <tr>
                            <td colSpan="8" style={{
                              textAlign: 'center',
                              padding: '40px',
                              color: '#93c5fd',
                              fontSize: '16px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              borderRadius: '12px'
                            }}>
                              No data for the selected period.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {mode === "2" && (
                    <div style={{
                      marginTop: '16px',
                      padding: '12px',
                      background: 'rgba(96, 165, 250, 0.1)',
                      borderRadius: '8px',
                      color: '#93c5fd',
                      fontSize: '13px',
                      textAlign: 'center'
                    }}>
                      ℹ️ Showing latest values. Enable history response in backend to list each update row.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Reports;