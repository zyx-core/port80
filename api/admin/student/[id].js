import { connectDB } from '../../_lib/db.js';
import { authenticateAdmin } from '../../_lib/auth.js';
import Student from '../../_lib/models/studentModel.js';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        await connectDB();

        // Authenticate admin
        await authenticateAdmin(req);

        // Get student ID from query parameter
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: 'Student ID is required' });
        }

        // GET - Fetch single student
        if (req.method === 'GET') {
            const student = await Student.findById(id).select('-password');

            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }

            return res.json({ student });
        }

        // PUT - Update student
        if (req.method === 'PUT') {
            const { name, branch, year } = req.body;

            const student = await Student.findById(id);
            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }

            student.name = name || student.name;
            student.branch = branch || student.branch;
            student.year = year || student.year;

            await student.save();

            return res.json({
                message: 'Student updated successfully',
                student: {
                    id: student._id,
                    name: student.name,
                    email: student.email,
                    branch: student.branch,
                    year: student.year
                }
            });
        }

        // DELETE - Delete student
        if (req.method === 'DELETE') {
            const student = await Student.findById(id);
            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }

            await student.deleteOne();

            return res.json({ message: 'Student deleted successfully' });
        }

        return res.status(405).json({ message: 'Method not allowed' });

    } catch (error) {
        console.error('Student operation error:', error);

        if (error.message.includes('token') || error.message.includes('not found')) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.status(500).json({ message: 'Error processing request', error: error.message });
    }
}
