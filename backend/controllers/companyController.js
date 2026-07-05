import Company from '../models/Company.js';

// @desc    Get all companies
// @route   GET /api/company
// @access  Public
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({}).sort({ createdAt: -1 });
    res.json(companies);
  } catch (error) {
    console.error(`Error in getCompanies: ${error.message}`);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single company by ID
// @route   GET /api/company/:id
// @access  Public
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ message: 'Company not found' });
    }
  } catch (error) {
    console.error(`Error in getCompanyById: ${error.message}`);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
