const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide contest title'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please provide contest category']
  },
  description: {
    type: String,
    required: [true, 'Please provide contest description']
  },
  prize: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['upcoming', 'active', 'completed'],
    default: 'upcoming'
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

contestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Contest', contestSchema);










