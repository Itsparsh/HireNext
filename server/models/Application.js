const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stage: { 
    type: String, 
    enum: ['Applied', 'Under Review', 'Shortlisted', 'Assessment', 'Technical Interview', 'HR Interview', 'Final Interview', 'Offer', 'Hired', 'Rejected'],
    default: 'Applied'
  },
  aiMatchScore: { type: Number, default: 0 },
  recruiterNotes: { type: String, default: '' },
  candidateScore: { type: Number, default: 0 },
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

ApplicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true });
ApplicationSchema.index({ stage: 1 });

module.exports = mongoose.model('Application', ApplicationSchema);
