const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  interviewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  scheduledAt: { type: Date, required: true },
  durationMinutes: { type: Number, default: 60 },
  type: { type: String, enum: ['Technical', 'HR', 'System Design', 'Behavioral', 'Other'], default: 'Other' },
  status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled'], default: 'Scheduled' },
  meetingLink: { type: String, default: '' },
  feedback: { type: String, default: '' },
  score: { type: Number, min: 0, max: 10 }
}, { timestamps: true });

module.exports = mongoose.model('Interview', InterviewSchema);
