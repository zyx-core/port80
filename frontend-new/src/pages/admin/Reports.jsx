import { useState } from "react";
import axios from "axios";

const Reports = () => {
  const token = localStorage.getItem("adminToken");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:5000/api/admin/report", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data.students);
    } catch (err) {
      alert("Failed to load report");
    }

    setLoading(false);
  };

  const printPage = () => {
    window.print();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Student Progress Report</h1>

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        Generate Report
      </button>

      {students.length > 0 && (
        <button
          onClick={printPage}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-4"
        >
          Print Report
        </button>
      )}

      {loading ? (
        <p className="text-gray-600 text-center mt-6">Fetching data...</p>
      ) : students.length > 0 ? (
        <table className="w-full border-collapse shadow-lg mt-6">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Branch</th>
              <th className="p-3 border">Year</th>
              <th className="p-3 border">MuLearn</th>
              <th className="p-3 border">CodeChef</th>
              <th className="p-3 border">LeetCode</th>
              <th className="p-3 border">GitHub</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id} className="text-center bg-white hover:bg-gray-100">
                <td className="border p-2">{s.name}</td>
                <td className="border p-2">{s.branch}</td>
                <td className="border p-2">{s.year}</td>
                <td className="border p-2">{s.progress?.mulearn || 0}</td>
                <td className="border p-2">{s.progress?.codechef || 0}</td>
                <td className="border p-2">{s.progress?.leetcode || 0}</td>
                <td className="border p-2">{s.progress?.github || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 mt-4">No report generated yet.</p>
      )}
    </div>
  );
};

export default Reports;
