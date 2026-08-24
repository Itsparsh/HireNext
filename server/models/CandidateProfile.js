const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
  description: { type: String, required: true }
});

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  school: { type: String, required: true },
  period: { type: String, required: true },
  branch: { type: String },
  passingYear: { type: String },
  grade: { type: String }
});

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true }
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, default: '' },
  tech: { type: String, default: '' } // Can store a comma-separated list of technologies
});

const CandidateProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  title: { type: String, default: 'Candidate' },
  location: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  about: { type: String, default: '' },
  photo: { type: String, default: '' }, // Base64 string or URL
  resume: { type: String, default: '' }, // Base64 string for PDF
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  portfolio: { type: String, default: '' },
  experience: [ExperienceSchema],
  education: [EducationSchema],
  skills: [SkillSchema],
  projects: [ProjectSchema],
  aiScore: {
    total: { type: Number, default: 92 },
    atsCompatibility: { type: Boolean, default: true },
    keywordDensity: { type: Boolean, default: true },
    missingLeadership: { type: Boolean, default: true }
  },
  savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  appliedJobs: [{ 
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    status: { type: String, enum: ['Applied', 'Interviewing', 'Rejected', 'Hired'], default: 'Applied' },
    appliedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('CandidateProfile', CandidateProfileSchema);
