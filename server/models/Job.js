const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  location: { type: String, required: true },
  workMode: { type: String, enum: ['Remote', 'Hybrid', 'On-site'], required: true },
  jobType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], required: true },
  salary: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    currency: { type: String, default: 'USD' }
  },
  experienceLevel: { type: String, enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'], required: true },
  skills: [{ type: String }],
  description: { type: String, required: true },
  responsibilities: [{ type: String }],
  qualifications: [{ type: String }],
  benefits: [{ type: String }],
  
  // AI & Advanced Features
  aiMatchScore: { type: Number, default: 0 },
  atsCompatibility: { type: Number, default: 0 },
  hiringUrgency: { type: String, enum: ['Normal', 'High', 'Urgent'], default: 'Normal' },
  applicantCount: { type: Number, default: 0 },
  recruiterStatus: { type: String, enum: ['Online', 'Offline', 'Away'], default: 'Online' },
  isEasyApply: { type: Boolean, default: false },
  
  postedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }
}, { timestamps: true });

// Indexes for fast searching and filtering
JobSchema.index({ title: 'text', skills: 'text' });
JobSchema.index({ location: 1 });
JobSchema.index({ workMode: 1 });
JobSchema.index({ jobType: 1 });
JobSchema.index({ 'salary.min': 1, 'salary.max': 1 });
JobSchema.index({ experienceLevel: 1 });
JobSchema.index({ postedAt: -1 });

module.exports = mongoose.model('Job', JobSchema);
