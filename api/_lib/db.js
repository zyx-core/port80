import mongoose from 'mongoose';

let cachedConnection = null;

/**
 * Optimized MongoDB connection for serverless environments
 * Uses connection caching to avoid cold start issues
 */
export async function connectDB() {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        console.log('✅ Using cached MongoDB connection');
        return cachedConnection;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
        });

        cachedConnection = conn;
        console.log('✅ New MongoDB connection established');
        return conn;
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        throw error;
    }
}
