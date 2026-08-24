const express = require('express');
const router = express.Router();
const mockJobs = require('../mockJobs');

// @route   GET /api/jobs
// @desc    Get all jobs with advanced filtering, sorting, and pagination from memory
router.get('/', (req, res) => {
  try {
    const { 
      search, 
      jobType, 
      experienceLevel, 
      workMode, 
      minSalary, 
      skills,
      hiringUrgency,
      page = 1, 
      limit = 10,
      sortBy = 'recent'
    } = req.query;

    let filteredJobs = [...mockJobs];

    // 1. Text Search (Title, Company, Skills)
    if (search) {
      const s = search.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(s) || 
        job.company.name.toLowerCase().includes(s) ||
        job.skills.some(skill => skill.toLowerCase().includes(s))
      );
    }

    // 2. Exact Matches / IN arrays
    if (jobType) {
      const types = jobType.split(',');
      filteredJobs = filteredJobs.filter(job => types.includes(job.jobType));
    }
    if (experienceLevel) {
      const levels = experienceLevel.split(',');
      filteredJobs = filteredJobs.filter(job => levels.includes(job.experienceLevel));
    }
    if (workMode) {
      const modes = workMode.split(',');
      filteredJobs = filteredJobs.filter(job => modes.includes(job.workMode));
    }
    if (hiringUrgency) {
      filteredJobs = filteredJobs.filter(job => job.hiringUrgency === hiringUrgency);
    }

    // 3. Range Queries (Salary)
    if (minSalary) {
      const minS = Number(minSalary);
      filteredJobs = filteredJobs.filter(job => job.salary.min >= minS);
    }

    // 4. Array intersection (Skills)
    if (skills) {
      const skillsArr = skills.split(',');
      filteredJobs = filteredJobs.filter(job => 
        skillsArr.every(s => job.skills.includes(s))
      );
    }

    // Determine Sorting
    filteredJobs.sort((a, b) => {
      if (sortBy === 'salaryHigh') return b.salary.min - a.salary.min;
      if (sortBy === 'aiMatch') return b.aiMatchScore - a.aiMatchScore;
      // Default: recent
      return new Date(b.postedAt) - new Date(a.postedAt);
    });

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = startIndex + limitNumber;

    const total = filteredJobs.length;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

    res.json({
      success: true,
      count: paginatedJobs.length,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      data: paginatedJobs
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   GET /api/jobs/:id
router.get('/:id', (req, res) => {
  const job = mockJobs.find(j => j._id === req.params.id);
  if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
  res.json({ success: true, data: job });
});

module.exports = router;
