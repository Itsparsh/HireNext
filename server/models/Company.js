const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, default: '' },
  coverBanner: { type: String, default: '' },
  description: { type: String, default: '' },
  website: { type: String, default: '' },
  industry: { type: String, default: '' },
  headquarters: { type: String, default: '' },
  employeeCount: { type: String, default: '' },
  socialMedia: {
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    facebook: { type: String, default: '' },
  },
  officeLocations: [{
    city: String,
    country: String,
    address: String
  }],
  technologiesUsed: [{ type: String }],
  benefits: [{ type: String }],
  galleryImages: [{ type: String }],
  verified: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

CompanySchema.index({ name: 'text', industry: 'text' });

module.exports = mongoose.model('Company', CompanySchema);
