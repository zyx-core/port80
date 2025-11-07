import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      alert("Admin not logged in");
      window.location.href = "/admin/login";
      return;
    }

    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(res.data.students || []);
      } catch (err) {
        console.log(err);
        alert("Failed to load student list");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [token]);

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/student/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(students.filter((s) => s._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
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
      <div style={{
        position: 'absolute',
        top: '80px',
        left: '128px',
        width: '256px',
        height: '256px',
        background: 'rgba(59, 130, 246, 0.2)',
        borderRadius: '50%',
        filter: 'blur(60px)'
      }}></div>
      
      <div style={{
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
        {/* Header Card */}
        <div style={{
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
              <svg width="48" height="48" viewBox="0 0 80 80">
                <path d="M20,25 Q30,15 40,25 T60,25" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round"/>
                <path d="M20,50 Q30,40 40,50 T60,50" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round"/>
              </svg>
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
                marginBottom: '4px'
              }}>
                Admin Dashboard
              </h1>
              <p style={{
                color: '#93c5fd',
                fontSize: '14px'
              }}>
                Manage all registered students
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => window.location.href = "/admin/reports"}
              style={{
                background: '#9333ea',
                color: 'white',
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#7e22ce';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#9333ea';
                e.target.style.transform = 'scale(1)';
              }}
            >
              📄 Generate Report
            </button>

            <button
              onClick={handleLogout}
              style={{
                background: '#dc2626',
                color: 'white',
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#b91c1c';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#dc2626';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Logout
            </button>
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
          {loading ? (
            <div style={{
              textAlign: 'center',
              color: '#bfdbfe',
              fontSize: '18px',
              padding: '40px'
            }}>
              Loading students...
            </div>
          ) : (
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
                    }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
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
                        textAlign: 'center',
                        borderTopRightRadius: '12px',
                        borderBottomRightRadius: '12px'
                      }}>
                        <Link
                          to={`/admin/students/${s._id}/edit`}
                          style={{
                            background: '#10b981',
                            color: 'white',
                            fontWeight: 600,
                            padding: '8px 16px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontSize: '13px',
                            display: 'inline-block',
                            marginRight: '8px',
                            transition: 'all 0.2s'
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
                          Edit
                        </Link>

                        <button
                          onClick={() => navigate(`/admin/student/report/${s._id}`)}
                          style={{
                            background: '#6366f1',
                            color: 'white',
                            fontWeight: 600,
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '13px',
                            marginRight: '8px',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#4f46e5';
                            e.target.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = '#6366f1';
                            e.target.style.transform = 'scale(1)';
                          }}
                        >
                          View Report
                        </button>

                        <button
                          onClick={() => deleteStudent(s._id)}
                          style={{
                            background: '#ef4444',
                            color: 'white',
                            fontWeight: 600,
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '13px',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#dc2626';
                            e.target.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = '#ef4444';
                            e.target.style.transform = 'scale(1)';
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {students.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{
                        textAlign: 'center',
                        padding: '40px',
                        color: '#93c5fd',
                        fontSize: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px'
                      }}>
                        No students found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;