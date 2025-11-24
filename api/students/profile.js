import { connectDB } from '../_lib/db.js';
import { authenticateStudent } from '../_lib/auth.js';

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

        // Authenticate student
        const student = await authenticateStudent(req);

        res.status(200).json({
            message: 'Profile fetched successfully',
            student
        });
    } catch (error) {
        console.error('Profile fetch error:', error);

        if (error.message.includes('token') || error.message.includes('not found')) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.status(500).json({ message: error.message });
    }
}
