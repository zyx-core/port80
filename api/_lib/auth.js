import jwt from 'jsonwebtoken';
import Student from './models/studentModel.js';
import Admin from './models/adminModel.js';

/**
 * Verify JWT token and return decoded payload
 */
export function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}

/**
 * Extract token from Authorization header
 */
export function extractToken(req) {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    return authHeader.split(' ')[1];
}

/**
 * Authenticate student from request
 * Returns student object or throws error
 */
export async function authenticateStudent(req) {
    const token = extractToken(req);

    if (!token) {
        throw new Error('No token provided');
    }

    const decoded = verifyToken(token);
    const student = await Student.findById(decoded.id).select('-password');

    if (!student) {
        throw new Error('Student not found');
    }

    return student;
}

/**
 * Authenticate admin from request
 * Returns admin object or throws error
 */
export async function authenticateAdmin(req) {
    const token = extractToken(req);

    if (!token) {
        throw new Error('No token provided');
    }

    const decoded = verifyToken(token);
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
        throw new Error('Admin not found');
    }

    return admin;
}

/**
 * Generate JWT token
 */
export function generateToken(userId, role = 'student') {
    return jwt.sign(
        { id: userId, role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}
