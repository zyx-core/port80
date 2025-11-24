import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../config/api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(getApiUrl("admin/login"), {
        email,
        password,
      });
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials");
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

      {/* Background Decorations */}
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

      {/* Main Card */}
      <form 
        onSubmit={handleLogin}
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
          maxWidth: '448px',
          margin: '20px'
        }}
      >

        <h1 style={{
          fontSize: '26px',
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          marginBottom: '8px'
        }}>
          Coding Club Admin Portal
        </h1>

        <p style={{
          textAlign: 'center',
          color: '#93c5fd',
          fontSize: '14px',
          marginBottom: '32px',
          fontWeight: 500
        }}>
          🔒 Authorized Access Only
        </p>

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

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            color: '#e0e7ff',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '8px'
          }}>
            Admin Email
          </label>
          <input
            type="email"
            placeholder="Enter admin email"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '14px',
              outline: 'none'
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
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
              outline: 'none'
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

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
            transition: 'all 0.3s',
            fontSize: '16px'
          }}
        >
          Login as Admin
        </button>

        {/* ✅ Contact Support Button */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={() =>
              window.open("https://wa.me/917994238524?text=Hello%20I%20need%20admin%20login%20assistance", "_blank")
            }
            style={{
              color: '#bfdbfe',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'underline',
              cursor: 'pointer',
              background: 'transparent',
              border: 'none'
            }}
          >
            Need help? Contact <span style={{ color: 'white' }}></span>
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminLogin;
