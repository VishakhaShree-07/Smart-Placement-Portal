import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Company from './models/Company.js';

dotenv.config();

const updateLogos = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smart-placement');
    
    await Company.updateOne({ name: 'Flipkart' }, { logo: '/logos/flipkart.svg' });
    await Company.updateOne({ name: 'TCS' }, { logo: '/logos/tcs.svg' });
    
    console.log('Successfully updated logos for Flipkart and TCS');
    process.exit(0);
  } catch (error) {
    console.error('Error updating logos:', error);
    process.exit(1);
  }
};

updateLogos();
