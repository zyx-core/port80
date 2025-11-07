import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProgress = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("studentToken");

  const [mulearn, setMulearn] = useState("");
  const [codechef, setCodechef] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [github, setGithub] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        "http://localhost:5000/api/students/progress",
        {
          mulearn,
          codechef,
          leetcode,
          github,
          comment,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Progress updated ✅");
      navigate("/student/dashboard");
    } catch (err) {
      console.log(err.response?.data);
      alert("Failed to update progress");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #1e3a8a, #1e40af, #1e3a8a)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0
    }}>

      {/* ✅ Dark Grey Placeholder Style Globally */}
      <style>
        {`
          input::placeholder, textarea::placeholder {
            color: rgba(0, 0, 0, 0.65) !important;
            font-weight: 500 !important;
          }
        `}
      </style>

      <form 
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          borderRadius: '24px',
          padding: '48px',
          width: '100%',
          maxWidth: '500px'
        }}
      >
        <h2 style={{
          color: 'white',
          textAlign: 'center',
          marginBottom: '32px',
          fontSize: '28px',
          fontWeight: 'bold'
        }}>
          Update Progress
        </h2>

        <input
          type="number"
          placeholder="MuLearn Points"
          style={inputStyle}
          value={mulearn}
          onChange={(e) => setMulearn(e.target.value)}
        />

        <input
          type="number"
          placeholder="CodeChef Rating"
          style={inputStyle}
          value={codechef}
          onChange={(e) => setCodechef(e.target.value)}
        />

        <input
          type="number"
          placeholder="LeetCode Solved"
          style={inputStyle}
          value={leetcode}
          onChange={(e) => setLeetcode(e.target.value)}
        />

        <input
          type="number"
          placeholder="GitHub Repos"
          style={inputStyle}
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />

        <textarea
          placeholder="Describe your improvements / achievements..."
          style={{ ...inputStyle, minHeight: "90px", resize: "vertical" }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <button type="submit" style={primaryButton}>
          Save Progress
        </button>

        <button type="button" onClick={() => navigate("/student/dashboard")} style={secondaryButton}>
          Cancel
        </button>
      </form>
    </div>
  );
};

/* Styles */
const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  background: 'rgba(255, 255, 255, 0.18)',
  color: 'white',
  fontSize: '15px',
  outline: 'none',
  marginBottom: '16px',
};

const primaryButton = {
  width: '100%',
  background: '#1d4ed8',
  color: 'white',
  fontWeight: 600,
  padding: '14px 24px',
  borderRadius: '12px',
  border: 'none',
  cursor: 'pointer',
  marginBottom: '12px'
};

const secondaryButton = {
  width: '100%',
  background: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  fontWeight: 600,
  padding: '14px 24px',
  borderRadius: '12px',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  cursor: 'pointer'
};

export default UpdateProgress;
