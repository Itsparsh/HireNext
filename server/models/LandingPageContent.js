const mongoose = require('mongoose');

const LandingPageContentSchema = new mongoose.Schema({
  activeUsers: { type: Number, default: 0 },
  jobsPosted: { type: Number, default: 0 },
  companiesHiring: { type: Number, default: 0 },
  featuredTestimonials: [{
    name: { type: String },
    role: { type: String },
    content: { type: String },
    rating: { type: Number }
  }]
}, { timestamps: true });

module.exports = mongoose.model('LandingPageContent', LandingPageContentSchema);
