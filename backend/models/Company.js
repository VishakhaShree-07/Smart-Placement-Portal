import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  logo: {
    type: String,
    default: ''
  },
  package: {
    type: String,
    required: [true, 'Package details are required']
  },
  eligibility: {
    type: String,
    required: [true, 'Eligibility criteria is required']
  },
  skillsRequired: [{
    type: String,
    trim: true
  }],
  hiringProcess: [{
    type: String,
    trim: true
  }],
  interviewRounds: {
    type: Number,
    required: true,
    min: 1
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Company = mongoose.model('Company', companySchema);

export default Company;
