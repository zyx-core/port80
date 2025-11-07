import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ViewStudentReport = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/admin/students/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStudent(res.data.student);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStudent();
  }, [id, token]);

  if (!student) {
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
        bottom: 0
      }}>
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
      </div>
    );
  }

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
        position: 'absolute',
        bottom: '128px',
        left: '192px',
        width: '320px',
        height: '320px',
        background: 'rgba(37, 99, 235, 0.1)',
        borderRadius: '50%',
        filter: 'blur(60px)'
      }}></div>

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1000px',
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
                marginBottom: '4px',
                margin: 0
              }}>
                Student Report
              </h1>
              <p style={{
                color: '#93c5fd',
                fontSize: '14px',
                margin: 0
              }}>
                Detailed progress and history
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

        {/* Student Info Card */}
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
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '24px',
            margin: '0 0 24px 0'
          }}>
            {student.name}'s Profile
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ color: '#93c5fd', fontSize: '14px', marginBottom: '8px' }}>Email</div>
              <div style={{ color: 'white', fontSize: '16px', fontWeight: '500' }}>{student.email}</div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ color: '#93c5fd', fontSize: '14px', marginBottom: '8px' }}>Branch</div>
              <div style={{ color: 'white', fontSize: '16px', fontWeight: '500' }}>{student.branch}</div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ color: '#93c5fd', fontSize: '14px', marginBottom: '8px' }}>Year</div>
              <div style={{ color: 'white', fontSize: '16px', fontWeight: '500' }}>{student.year}</div>
            </div>
          </div>
        </div>

        {/* Progress Card */}
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
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '24px',
            margin: '0 0 24px 0'
          }}>
            Progress Metrics
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}>
            <div style={{
              background: 'rgba(96, 165, 250, 0.1)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(96, 165, 250, 0.2)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📌</div>
              <div style={{ color: '#93c5fd', fontSize: '14px', marginBottom: '4px' }}>MuLearn Points</div>
              <div style={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}>
                {student.progress?.mulearn || 0}
              </div>
            </div>

            <div style={{
              background: 'rgba(96, 165, 250, 0.1)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(96, 165, 250, 0.2)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏆</div>
              <div style={{ color: '#93c5fd', fontSize: '14px', marginBottom: '4px' }}>CodeChef Rating</div>
              <div style={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}>
                {student.progress?.codechef || 0}
              </div>
            </div>

            <div style={{
              background: 'rgba(96, 165, 250, 0.1)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(96, 165, 250, 0.2)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>💡</div>
              <div style={{ color: '#93c5fd', fontSize: '14px', marginBottom: '4px' }}>LeetCode Solved</div>
              <div style={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}>
                {student.progress?.leetcode || 0}
              </div>
            </div>

            <div style={{
              background: 'rgba(96, 165, 250, 0.1)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(96, 165, 250, 0.2)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🐙</div>
              <div style={{ color: '#93c5fd', fontSize: '14px', marginBottom: '4px' }}>GitHub Repos</div>
              <div style={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}>
                {student.progress?.github || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Comments History Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          borderRadius: '24px',
          padding: '32px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '24px',
            margin: '0 0 24px 0'
          }}>
            📝 Student Comments History
          </h2>

          {student.progress?.history?.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {student.progress.history.map((entry, i) => (
                <div key={i} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{
                    color: '#93c5fd',
                    fontSize: '13px',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    {entry.date?.slice(0, 10)}
                  </div>
                  <div style={{
                    color: 'white',
                    fontSize: '15px',
                    lineHeight: '1.6'
                  }}>
                    {entry.comment}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#93c5fd',
              fontSize: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px'
            }}>
              No comments submitted yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewStudentReport;