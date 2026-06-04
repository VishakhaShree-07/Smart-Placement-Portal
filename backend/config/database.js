import mongoose from 'mongoose';

/**
 * Reusable function to connect to MongoDB Atlas database.
 * Loads the connection string from MONGO_URI environment variable.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected Success: Host: ${conn.connection.host}, Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Exit process with failure code
    process.exit(1);
  }
};

export default connectDB;
