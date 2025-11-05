const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide sponsor name'],
    trim: true
  },
  logo: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  socialMedia: {
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    youtube: { type: String, default: '' },
    tiktok: { type: String, default: '' }
  },
  description: {
    type: String,
    default: ''
  },
  tier: {
    type: String,
    enum: ['gold', 'silver', 'bronze'],
    default: 'bronze'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

sponsorSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Sponsor', sponsorSchema);





