import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import UpdateProgress from "./pages/student/UpdateProgress.jsx";

import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import EditStudentProgress from "./pages/admin/EditStudentProgress.jsx";
import { Routes, Route } from "react-router-dom";
import ViewStudentReport from "./pages/admin/ViewStudentReport";
import Reports from "./pages/admin/Reports";
import AdminReports from "./pages/admin/AdminReports";

function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Student Auth & Dashboard */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/update-progress" element={<UpdateProgress />} />
      <Route path="/admin/student/report/:id" element={<ViewStudentReport />} />
      <Route path="/admin/reports" element={<Reports />} />
      <Route path="/admin/reports" element={<AdminReports />} />



      {/* Admin Auth & Dashboard */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/students/:id/edit" element={<EditStudentProgress />} />
    </Routes>
  );
}

export default App;
