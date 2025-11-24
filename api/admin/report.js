import { connectDB } from '../_lib/db.js';
import { authenticateAdmin } from '../_lib/auth.js';
import Student from '../_lib/models/studentModel.js';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectDB();

        // Authenticate admin
        await authenticateAdmin(req);

        const { startDate, endDate } = req.body;

        const query = {};
        if (startDate && endDate) {
            query['progress.history.date'] = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        const students = await Student.find(query).select('-password');

        const stats = {
            totalStudents: students.length,
            avgMuLearn: students.length > 0
                ? Math.round(students.reduce((a, s) => a + (s.progress?.mulearn || 0), 0) / students.length)
                : 0,
            avgLeetCode: students.length > 0
                ? Math.round(students.reduce((a, s) => a + (s.progress?.leetcode || 0), 0) / students.length)
                : 0,
            avgGitHub: students.length > 0
                ? Math.round(students.reduce((a, s) => a + (s.progress?.github || 0), 0) / students.length)
                : 0,
        };

        // Leaderboard (Top 5 by LeetCode solves)
        const leaderboard = [...students]
            .sort((a, b) => (b.progress?.leetcode || 0) - (a.progress?.leetcode || 0))
            .slice(0, 5);

        res.json({
            stats,
            students,
            leaderboard
        });

    } catch (error) {
        console.error('Report generation error:', error);

        if (error.message.includes('token') || error.message.includes('not found')) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.status(500).json({ message: 'Report generation failed', error: error.message });
    }
}
