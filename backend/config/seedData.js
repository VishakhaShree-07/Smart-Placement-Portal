import mongoose from 'mongoose';
import Company from '../models/Company.js';
import Resource from '../models/Resource.js';

const companiesData = [
  {
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    package: '30-40 LPA',
    eligibility: 'B.Tech CSE/IT with 8+ CGPA',
    skillsRequired: ['DSA', 'System Design', 'C++', 'Java'],
    hiringProcess: ['Online Assessment', 'Technical Interview 1', 'Technical Interview 2', 'Googlyness Round'],
    interviewRounds: 4,
    difficulty: 'Hard'
  },
  {
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    package: '40-45 LPA',
    eligibility: 'B.Tech all branches with 7.5+ CGPA',
    skillsRequired: ['DSA', 'Operating Systems', 'C#', 'C++'],
    hiringProcess: ['Online Coding Round', 'Technical Interview (DSA)', 'Technical Interview (System Design)', 'HR Round'],
    interviewRounds: 4,
    difficulty: 'Hard'
  },
  {
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    package: '25-30 LPA',
    eligibility: 'B.Tech CSE/IT with 7+ CGPA',
    skillsRequired: ['DSA', 'Java', 'Problem Solving', 'AWS Basics'],
    hiringProcess: ['Online Assessment (Debugging + Coding)', 'Technical Round 1', 'Technical Round 2', 'Bar Raiser Round'],
    interviewRounds: 4,
    difficulty: 'Hard'
  },
  {
    name: 'Adobe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg',
    package: '22-25 LPA',
    eligibility: 'B.Tech with 8+ CGPA',
    skillsRequired: ['C++', 'Java', 'Data Structures', 'Algorithms'],
    hiringProcess: ['Aptitude + Coding Round', 'Technical Interview 1', 'Technical Interview 2', 'Director Round'],
    interviewRounds: 4,
    difficulty: 'Hard'
  },
  {
    name: 'Flipkart',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Flipkart_logo.png',
    package: '20-26 LPA',
    eligibility: 'B.Tech CSE with 7.5+ CGPA',
    skillsRequired: ['DSA', 'Machine Coding', 'System Design'],
    hiringProcess: ['Online Coding Test', 'Machine Coding Round', 'Problem Solving / PS DS Round', 'Hiring Manager Round'],
    interviewRounds: 4,
    difficulty: 'Hard'
  },
  {
    name: 'TCS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg',
    package: '3.3-7 LPA',
    eligibility: 'B.Tech with 60% throughout',
    skillsRequired: ['Aptitude', 'C', 'Java', 'Python', 'Basic DSA'],
    hiringProcess: ['TCS NQT Test', 'Technical Interview', 'Managerial Interview', 'HR Interview'],
    interviewRounds: 3,
    difficulty: 'Easy'
  },
  {
    name: 'Infosys',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg',
    package: '3.6-8 LPA',
    eligibility: 'B.Tech with 60% throughout',
    skillsRequired: ['Aptitude', 'Java', 'Python', 'DBMS'],
    hiringProcess: ['Online Assessment', 'Technical Interview', 'HR Interview'],
    interviewRounds: 2,
    difficulty: 'Easy'
  }
];

const resourcesData = [
  {
    title: 'Striver SDE Sheet',
    category: 'DSA',
    description: 'Top coding interview questions curated by Striver.',
    link: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/'
  },
  {
    title: 'LeetCode Top Interview Questions',
    category: 'DSA',
    description: 'A collection of the most frequently asked interview questions.',
    link: 'https://leetcode.com/problemset/all/?listId=wpwgkgt'
  },
  {
    title: 'Indiabix Aptitude',
    category: 'Aptitude',
    description: 'Comprehensive aptitude practice questions with answers.',
    link: 'https://www.indiabix.com/'
  },
  {
    title: 'Operating Systems - Gate Smashers',
    category: 'CS Fundamentals',
    description: 'Detailed OS concepts explained in Hindi.',
    link: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p'
  },
  {
    title: 'DBMS - Gate Smashers',
    category: 'CS Fundamentals',
    description: 'Database Management Systems tutorial for interviews.',
    link: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y'
  },
  {
    title: 'Pramp - Mock Interviews',
    category: 'Interview Prep',
    description: 'Practice mock interviews with peers.',
    link: 'https://www.pramp.com/'
  },
  {
    title: 'Novoresume',
    category: 'Resume Building',
    description: 'Create a professional resume with easy-to-use templates.',
    link: 'https://novoresume.com/'
  }
];

const seedData = async () => {
  try {
    const companyCount = await Company.countDocuments();
    const resourceCount = await Resource.countDocuments();

    if (companyCount === 0) {
      await Company.insertMany(companiesData);
      console.log('Sample Companies seeded successfully');
    }
    
    if (resourceCount === 0) {
      await Resource.insertMany(resourcesData);
      console.log('Sample Resources seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

export default seedData;
