import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import handlers
import studentRegister from './api/students/register.js';
import studentLogin from './api/students/login.js';
import studentProfile from './api/students/profile.js';
import studentProgress from './api/students/progress.js';

import adminRegister from './api/admin/register.js';
import adminLogin from './api/admin/login.js';
import adminDashboard from './api/admin/dashboard.js';
import adminStudents from './api/admin/students.js';
import adminStudentId from './api/admin/student/[id].js';
import adminReport from './api/admin/report.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper to wrap Vercel handlers for Express
const wrap = (handler) => async (req, res) => {
    try {
        await handler(req, res);
    } catch (error) {
        console.error('Error in handler:', error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
};

// Routes
console.log('🔌 Mounting routes...');

// Student Routes
app.post('/api/students/register', wrap(studentRegister));
app.post('/api/students/login', wrap(studentLogin));
app.get('/api/students/profile', wrap(studentProfile));
app.put('/api/students/progress', wrap(studentProgress));

// Admin Routes
app.post('/api/admin/register', wrap(adminRegister));
app.post('/api/admin/login', wrap(adminLogin));
app.get('/api/admin/dashboard', wrap(adminDashboard));
app.get('/api/admin/students', wrap(adminStudents));
app.post('/api/admin/report', wrap(adminReport));

// Dynamic Route for Student ID
app.all('/api/admin/student/:id', wrap(adminStudentId));

// Start server
app.listen(PORT, () => {
    console.log(`
🚀 Local Server Running!
--------------------------
📡 URL: http://localhost:${PORT}
📝 Mode: Local Simulation (No Vercel Login Required)
--------------------------
  `);
});
