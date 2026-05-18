import 'dotenv/config';
import mongoose from 'mongoose';

let mongoReady = false;

export const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.log('MONGO_URI not set. Using in-memory data for this session.');
    return false;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    mongoReady = true;
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    mongoReady = false;
    console.warn('MongoDB connection failed. Using in-memory data for this session.');
    console.warn(error.message);
    return false;
  }
};

export const isMongoReady = () => mongoReady;
