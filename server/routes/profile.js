const express = require('express');
const router = express.Router();
const CandidateProfile = require('../models/CandidateProfile');
const { protect, authorize } = require('../middleware/authMiddleware');

// @route   GET /api/profile
// @desc    Get candidate profile (securely tied to user)
// @access  Private
router.get('/', protect, authorize('candidate'), async (req, res) => {
  try {
    let profile = await CandidateProfile.findOne({ user: req.user.id });
    
    // If no profile exists, create an empty/default one tied to this user
    if (!profile) {
      profile = await CandidateProfile.create({
        user: req.user.id,
        name: req.user.name || "Candidate User",
        title: "Professional",
        location: "",
        email: req.user.email || "",
        phone: "",
        about: "",
        skills: [],
        experience: [],
        education: []
      });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/profile
// @desc    Update candidate profile
// @access  Private
router.put('/', protect, authorize('candidate'), async (req, res) => {
  try {
    // Ensure we don't accidentally update the user ID
    if (req.body.user) delete req.body.user;

    const profile = await CandidateProfile.findOneAndUpdate(
      { user: req.user.id },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
