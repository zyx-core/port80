import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/students/register", {
        name,
        email,
        password,
        branch,
        year,
      });

      alert("Registration successful ✅");
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.message || "Registration Failed");
    }
  };

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
        onSubmit={handleRegister}
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
          maxWidth: '500px',
          margin: '20px'
        }}
      >
        {/* Logo */}
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
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
          }}>
            <svg width="64" height="64" viewBox="0 0 80 80">
              <path d="M20,25 Q30,15 40,25 T60,25" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round"/>
              <path d="M20,50 Q30,40 40,50 T60,50" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <p style={{
            color: '#bfdbfe',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>Your logo</p>
        </div>

        <h2 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          Student Register
        </h2>

        {error && (
          <div style={{
            marginBottom: '16px',
            padding: '12px 16px',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#fecaca',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Full Name */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            color: '#e0e7ff',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '8px'
          }}>
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => {
              e.target.style.border = '1px solid rgba(96, 165, 250, 0.5)';
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            required
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            color: '#e0e7ff',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '8px'
          }}>
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={(e) => {
              e.target.style.border = '1px solid rgba(96, 165, 250, 0.5)';
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            required
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            color: '#e0e7ff',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '8px'
          }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={(e) => {
              e.target.style.border = '1px solid rgba(96, 165, 250, 0.5)';
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            required
          />
        </div>

        {/* Branch */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            color: '#e0e7ff',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '8px'
          }}>
            Branch
          </label>
          <input
            type="text"
            placeholder="e.g., CSE, ECE, ME"
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
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            onFocus={(e) => {
              e.target.style.border = '1px solid rgba(96, 165, 250, 0.5)';
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            required
          />
        </div>

        {/* Year */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            color: '#e0e7ff',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '8px'
          }}>
            Year
          </label>
          <input
            type="number"
            placeholder="e.g., 1, 2, 3, 4"
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
            value={year}
            onChange={(e) => setYear(e.target.value)}
            onFocus={(e) => {
              e.target.style.border = '1px solid rgba(96, 165, 250, 0.5)';
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            required
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
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
          Register
        </button>

        {/* Login Link */}
        <div style={{
          marginTop: '24px',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#bfdbfe',
            fontSize: '14px'
          }}>
            Already have an account?{" "}
            <Link 
              to="/login" 
              style={{
                color: 'white',
                fontWeight: 600,
                textDecoration: 'underline'
              }}
            >
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;