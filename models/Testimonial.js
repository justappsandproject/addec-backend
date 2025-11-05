const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Please provide role'],
    trim: true
  },
  quote: {
    type: String,
    required: [true, 'Please provide quote']
  },
  image: {
    type: String,
    default: ''
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

testimonialSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Testimonial', testimonialSchema);










