import Resource from '../models/Resource.js';

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find({}).sort({ category: 1, createdAt: -1 });
    res.json(resources);
  } catch (error) {
    console.error(`Error in getResources: ${error.message}`);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
