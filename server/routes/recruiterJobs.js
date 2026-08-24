const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Company = require('../models/Company');
const { protect, authorize } = require('../middleware/authMiddleware');

// @route   GET /api/recruiter/jobs
// @desc    Get jobs posted by the recruiter's company
// @access  Private (Recruiter)
router.get('/', protect, authorize('recruiter', 'admin'), async (req, res) => {
  try {
    if (!req.user.companyId) {
      return res.status(400).json({ success: false, message: 'Recruiter does not have a company assigned' });
    }
    const jobs = await Job.find({ company: req.user.companyId })
      .populate('company', 'name logo')
      .sort({ postedAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   POST /api/recruiter/jobs
// @desc    Create a new job posting
// @access  Private (Recruiter)
router.post('/', protect, authorize('recruiter', 'admin'), async (req, res) => {
  try {
    if (!req.user.companyId) {
      return res.status(400).json({ success: false, message: 'Recruiter must create a company profile first' });
    }
    
    const newJob = new Job({
      ...req.body,
      company: req.user.companyId
    });
    
    // AI Mock calculation for demo purposes
    newJob.aiMatchScore = Math.floor(Math.random() * 20) + 80;
    newJob.atsCompatibility = Math.floor(Math.random() * 30) + 70;
    
    const savedJob = await newJob.save();
    res.status(201).json({ success: true, data: savedJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   PUT /api/recruiter/jobs/:id
// @desc    Update a job posting
// @access  Private (Recruiter)
router.put('/:id', protect, authorize('recruiter', 'admin'), async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    
    // Make sure job belongs to recruiter's company
    if (job.company.toString() !== req.user.companyId.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized to update this job' });
    }
    
    job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   DELETE /api/recruiter/jobs/:id
// @desc    Delete a job posting
// @access  Private (Recruiter)
router.delete('/:id', protect, authorize('recruiter', 'admin'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    
    if (job.company.toString() !== req.user.companyId.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this job' });
    }
    
    await job.deleteOne();
    res.json({ success: true, message: 'Job removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
