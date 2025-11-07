import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditStudentProgress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [student, setStudent] = useState(null);
  const [progress, setProgress] = useState({
    mulearn: "",
    codechef: "",
    leetcode: "",
    github: ""
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/students", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const found = res.data.students.find((s) => s._id === id);

        if (!found) {
          alert("Student not found");
          navigate("/admin/dashboard");
          return;
        }

        setStudent(found);

        setProgress({
          mulearn: found.progress?.mulearn || "",
          codechef: found.progress?.codechef || "",
          leetcode: found.progress?.leetcode || "",
          github: found.progress?.github || ""
        });

      } catch (err) {
        alert("Failed to load student data");
      }
    };

    fetchStudent();
  }, [id, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/admin/student/${id}`,
        { progress },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Progress updated successfully ✅");
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Failed to update");
    }
  };

  const fieldIcons = {
    mulearn: "📌",
    codechef: "🏆",
    leetcode: "💡",
    github: "🐙"
  };

  const fieldLabels = {
    mulearn: "MuLearn Points",
    codechef: "CodeChef Rating",
    leetcode: "LeetCode Solved",
    github: "GitHub Repos"
  };

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
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto'
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
      
      {/* Abstract Wave Shapes - Left Side */}
      <div style={{
        position: 'absolute',
        top: '128px',
        left: '64px',
        opacity: 0.4
      }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <path d="M20,40 Q35,20 50,40 T80,40" stroke="#60a5fa" strokeWidth="12" fill="none" strokeLinecap="round"/>
          <path d="M20,70 Q35,50 50,70 T80,70" stroke="#60a5fa" strokeWidth="12" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
      
      {/* Abstract Wave Shapes - Right Side */}
      <div style={{
        position: 'absolute',
        bottom: '192px',
        right: '128px',
        opacity: 0.3
      }}>
        <svg width="140" height="140" viewBox="0 0 140 140">
          <path d="M30,50 Q50,30 70,50 T110,50" stroke="#93c5fd" strokeWidth="14" fill="none" strokeLinecap="round"/>
          <path d="M30,85 Q50,65 70,85 T110,85" stroke="#93c5fd" strokeWidth="14" fill="none" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Main Card */}
      <form 
        onSubmit={handleSubmit}
        style={{
          position: 'relative',
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          borderRadius: '24px',
          padding: '48px',
          width: '100%',
          maxWidth: '600px',
          margin: '20px'
        }}
      >
        {/* Logo with Admin Badge */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }}>
            <svg width="64" height="64" viewBox="0 0 80 80">
              <path d="M20,25 Q30,15 40,25 T60,25" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round"/>
              <path d="M20,50 Q30,40 40,50 T60,50" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round"/>
            </svg>
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#f59e0b',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}>⚡</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <p style={{
            color: '#bfdbfe',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>Admin Panel</p>
        </div>

        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          marginBottom: '8px'
        }}>
          Edit Progress
        </h2>

        {/* Student Info */}
        <div style={{
          background: 'rgba(96, 165, 250, 0.1)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '32px',
          border: '1px solid rgba(96, 165, 250, 0.2)',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#93c5fd',
            fontSize: '13px',
            marginBottom: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>Student</p>
          <p style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>{student.name}</p>
          <p style={{
            color: '#bfdbfe',
            fontSize: '14px',
            marginTop: '4px'
          }}>{student.email}</p>
        </div>

        {/* Progress Fields */}
        {["mulearn", "codechef", "leetcode", "github"].map((field) => (
          <div key={field} style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              color: '#e0e7ff',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '20px', marginRight: '8px' }}>{fieldIcons[field]}</span>
              {fieldLabels[field]}
            </label>
            <input
              type="number"
              placeholder={`Enter ${fieldLabels[field].toLowerCase()}`}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              value={progress[field]}
              onChange={(e) => setProgress({ ...progress, [field]: e.target.value })}
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
        ))}

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
          <button
            type="submit"
            style={{
              width: '100%',
              background: '#10b981',
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
              e.target.style.background = '#059669';
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#10b981';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontWeight: 600,
              padding: '14px 24px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontSize: '16px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudentProgress;