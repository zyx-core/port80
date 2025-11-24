import bcrypt from 'bcryptjs';
import { connectDB } from '../_lib/db.js';
import { generateToken } from '../_lib/auth.js';
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

        const { name, email, password, branch, year } = req.body;

        // Validate required fields
        if (!name || !email || !password || !branch || !year) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if student already exists
        const existing = await Student.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Student already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create student
        const student = await Student.create({
            name,
            email,
            password: hashedPassword,
            branch,
            year
        });

        res.status(201).json({
            message: 'Student registered successfully',
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                branch: student.branch,
                year: student.year
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: error.message });
    }
}
