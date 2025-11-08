import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const token = localStorage.getItem("studentToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/students/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(res.data.student);
      } catch (error) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("studentToken");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [token, navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1e3a8a 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
        position: 'absolute',
        bottom: '128px',
        left: '192px',
        width: '320px',
        height: '320px',
        background: 'rgba(37, 99, 235, 0.1)',
        borderRadius: '50%',
        filter: 'blur(60px)'
      }}></div>

      {student ? (
        <div style={{
          position: 'relative',
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          borderRadius: '24px',
          padding: '48px',
          width: '100%',
          maxWidth: '900px',
          margin: '20px'
        }}>
          {/* Header with Logo */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
            }}>
              <svg width="64" height="64" viewBox="0 0 80 80">
                <path d="M20,25 Q30,15 40,25 T60,25" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round"/>
                <path d="M20,50 Q30,40 40,50 T60,50" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            Welcome, {student.name} 👋
          </h2>

          {/* Student Info Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#bfdbfe',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Student Information
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px'
            }}>
              <div style={{ color: 'white' }}>
                <span style={{ color: '#93c5fd', fontWeight: 500 }}>Email:</span> {student.email}
              </div>
              <div style={{ color: 'white' }}>
                <span style={{ color: '#93c5fd', fontWeight: 500 }}>Branch:</span> {student.branch}
              </div>
              <div style={{ color: 'white' }}>
                <span style={{ color: '#93c5fd', fontWeight: 500 }}>Year:</span> {student.year}
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#bfdbfe',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Your Progress
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              <div style={{
                background: 'rgba(96, 165, 250, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid rgba(96, 165, 250, 0.2)'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📌</div>
                <div style={{ color: '#93c5fd', fontSize: '14px', marginBottom: '4px' }}>MuLearn Points</div>
                <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                  {student.progress?.mulearn || 0}
                </div>
              </div>

              <div style={{
                background: 'rgba(96, 165, 250, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid rgba(96, 165, 250, 0.2)'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏆</div>
                <div style={{ color: '#93c5fd', fontSize: '14px', marginBottom: '4px' }}>CodeChef Rating</div>
                <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                  {student.progress?.codechef || 0}
                </div>
              </div>

              <div style={{
                background: 'rgba(96, 165, 250, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid rgba(96, 165, 250, 0.2)'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>💡</div>
                <div style={{ color: '#93c5fd', fontSize: '14px', marginBottom: '4px' }}>LeetCode Solved</div>
                <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                  {student.progress?.leetcode || 0}
                </div>
              </div>

              <div style={{
                background: 'rgba(96, 165, 250, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid rgba(96, 165, 250, 0.2)'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🐙</div>
                <div style={{ color: '#93c5fd', fontSize: '14px', marginBottom: '4px' }}>GitHub Repos</div>
                <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                  {student.progress?.github || 0}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => navigate("/student/update-progress")}
              style={{
                width: '100%',
                background: '#1d4ed8',
                color: 'white',
                fontWeight: 600,
                padding: '14px 24px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s',
                fontSize: '16px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#1e40af';
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#1d4ed8';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Update Progress
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("studentToken");
                navigate("/login");
              }}
              style={{
                width: '100%',
                background: '#dc2626',
                color: 'white',
                fontWeight: 600,
                padding: '14px 24px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s',
                fontSize: '16px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#b91c1c';
                e.target.style.transform = 'scale(1.02)';
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
      ) : (
        <div style={{
          position: 'relative',
          zIndex: 10,
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
          Loading...
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;