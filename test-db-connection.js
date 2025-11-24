// Quick test script to verify MongoDB connection
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function testConnection() {
    try {
        console.log('🔄 Testing MongoDB connection...');
        console.log('📍 URI:', process.env.MONGO_URI?.substring(0, 30) + '...');

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log('✅ MongoDB connection successful!');
        console.log('📊 Database:', mongoose.connection.db.databaseName);

        await mongoose.connection.close();
        console.log('👋 Connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

testConnection();
