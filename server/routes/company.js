const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const { protect, authorize } = require('../middleware/authMiddleware');

// @route   GET /api/company
// @desc    Get current user's company profile
// @access  Private (Recruiter)
router.get('/', protect, authorize('recruiter', 'admin'), async (req, res) => {
  try {
    const company = await Company.findById(req.user.companyId);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company profile not found' });
    }
    res.json({ success: true, data: company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   POST /api/company
// @desc    Create company profile
// @access  Private (Recruiter)
router.post('/', protect, authorize('recruiter', 'admin'), async (req, res) => {
  try {
    if (req.user.companyId) {
      return res.status(400).json({ success: false, message: 'User already has a company profile' });
    }
    const newCompany = new Company({
      ...req.body,
      createdBy: req.user._id
    });
    const savedCompany = await newCompany.save();
    
    // Update user with companyId
    req.user.companyId = savedCompany._id;
    await req.user.save();

    res.status(201).json({ success: true, data: savedCompany });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   PUT /api/company
// @desc    Update company profile
// @access  Private (Recruiter)
router.put('/', protect, authorize('recruiter', 'admin'), async (req, res) => {
  try {
    let company = await Company.findById(req.user.companyId);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company profile not found' });
    }
    
    // Check if user is authorized to update this company (they created it or are admin)
    if (company.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to update this company' });
    }

    company = await Company.findByIdAndUpdate(req.user.companyId, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, data: company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
