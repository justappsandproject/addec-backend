const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Please provide address']
  },
  areaOfInterest: [{
    type: String
  }],
  experience: {
    type: String,
    default: ''
  },
  availability: {
    type: String,
    required: [true, 'Please provide availability']
  },
  additionalInfo: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
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

volunteerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Volunteer', volunteerSchema);










