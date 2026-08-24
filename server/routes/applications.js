const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Job');
const { protect, authorize } = require('../middleware/authMiddleware');

// @route   GET /api/applications/job/:jobId
// @desc    Get all applications for a specific job (Recruiter view)
// @access  Private (Recruiter)
router.get('/job/:jobId', protect, authorize('recruiter', 'admin'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    
    // Verify job belongs to the recruiter's company
    if (job.company.toString() !== req.user.companyId.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('candidateId', 'name email avatar')
      .sort({ appliedAt: -1 });
      
    res.json({ success: true, data: applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   PUT /api/applications/:id/stage
// @desc    Update application stage (Kanban drag and drop)
// @access  Private (Recruiter)
router.put('/:id/stage', protect, authorize('recruiter', 'admin'), async (req, res) => {
  try {
    const { stage } = req.body;
    let application = await Application.findById(req.params.id).populate('jobId');
    
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    
    // Verify job belongs to recruiter's company
    if (application.jobId.company.toString() !== req.user.companyId.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    application.stage = stage;
    application.updatedAt = Date.now();
    await application.save();
    
    res.json({ success: true, data: application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
