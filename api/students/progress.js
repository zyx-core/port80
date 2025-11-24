import { connectDB } from '../_lib/db.js';
import { authenticateStudent } from '../_lib/auth.js';
import Student from '../_lib/models/studentModel.js';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectDB();

        // Authenticate student
        const authenticatedStudent = await authenticateStudent(req);

        const { mulearn, codechef, leetcode, github, comment } = req.body;

        const student = await Student.findById(authenticatedStudent._id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Ensure progress field exists
        if (!student.progress) {
            student.progress = {};
        }

        // Update progress fields
        if (mulearn !== undefined) student.progress.mulearn = mulearn;
        if (codechef !== undefined) student.progress.codechef = codechef;
        if (leetcode !== undefined) student.progress.leetcode = leetcode;
        if (github !== undefined) student.progress.github = github;

        // Store student's comment with date stamp
        if (comment && comment.trim() !== '') {
            if (!student.progress.history) student.progress.history = [];

            student.progress.history.push({
                comment,
                date: new Date()
            });
        }

        await student.save();

        res.status(200).json({
            message: 'Progress updated successfully ✅',
            progress: student.progress,
        });

    } catch (error) {
        console.error('Progress update error:', error);

        if (error.message.includes('token') || error.message.includes('not found')) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.status(500).json({ message: 'Error updating progress', error: error.message });
    }
}
