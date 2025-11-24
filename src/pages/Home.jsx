import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this

const Home = () => {
  const navigate = useNavigate(); // ✅ Create navigation function

  return (
    <div 
      style={{
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
        overflow: 'hidden'
      }}
    >
      {/* Decorative Background Elements and Card Code Remains EXACTLY Same */}
      
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
        maxWidth: '448px'
      }}>

        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          marginBottom: '40px',
          letterSpacing: '0.025em'
        }}>
          Coding Club Portal
        </h1>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '32px'
        }}>

          {/* ✅ Student Login Navigation */}
          <button 
            onClick={() => navigate("/login")}   // ✅ Added
            style={{
              background: '#1d4ed8',
              color: 'white',
              fontWeight: 600,
              padding: '16px 24px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s',
              fontSize: '16px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#1e40af';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#1d4ed8';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Student Login
          </button>

          {/* ✅ Student Register Navigation */}
          <button 
            onClick={() => navigate("/register")}  // ✅ Added
            style={{
              background: '#1d4ed8',
              color: 'white',
              fontWeight: 600,
              padding: '16px 24px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s',
              fontSize: '16px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#1e40af';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#1d4ed8';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Student Register
          </button>

          {/* ✅ Admin Login Navigation */}
          <button 
            onClick={() => navigate("/admin/login")}  // ✅ Added
            style={{
              background: '#1d4ed8',
              color: 'white',
              fontWeight: 600,
              padding: '16px 24px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s',
              fontSize: '16px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#1e40af';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#1d4ed8';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
