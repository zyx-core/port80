import { connectDB } from '../_lib/db.js';
import { authenticateAdmin } from '../_lib/auth.js';
import Student from '../_lib/models/studentModel.js';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectDB();

        // Authenticate admin
        await authenticateAdmin(req);

        const students = await Student.find();

        const totalStudents = students.length;

        // Calculate total score for ranking
        const rankedStudents = students
            .map(student => ({
                name: student.name,
                progress: student.progress,
                totalScore:
                    (student.progress?.mulearn || 0) +
                    (student.progress?.codechef || 0) +
                    (student.progress?.leetcode || 0) +
                    (student.progress?.github || 0)
            }))
            .sort((a, b) => b.totalScore - a.totalScore) // highest first
            .slice(0, 5); // top 5 performers

        res.status(200).json({
            message: 'Dashboard stats fetched successfully',
            totalStudents,
            topPerformers: rankedStudents,
        });

    } catch (error) {
        console.error('Dashboard stats error:', error);

        if (error.message.includes('token') || error.message.includes('not found')) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
    }
}
