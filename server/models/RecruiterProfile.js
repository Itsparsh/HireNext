const mongoose = require('mongoose');

const RecruiterProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, default: 'Talent Acquisition Manager' },
  company: { 
    name: { type: String, required: true },
    logo: { type: String },
    industry: { type: String },
    size: { type: String }
  },
  email: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
}, { timestamps: true });

module.exports = mongoose.model('RecruiterProfile', RecruiterProfileSchema);
