const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide event title'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please provide event category'],
    enum: ['Concert', 'Comedy', 'Cultural', 'Contest', 'Food', 'Workshop', 'Festival']
  },
  date: {
    type: String,
    required: [true, 'Please provide event date']
  },
  location: {
    type: String,
    required: [true, 'Please provide event location']
  },
  capacity: {
    type: Number,
    required: [true, 'Please provide event capacity']
  },
  description: {
    type: String,
    required: [true, 'Please provide event description']
  },
  image: {
    type: String,
    default: ''
  },
  price: {
    type: String,
    required: [true, 'Please provide event price']
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

// Update the updatedAt field before saving
eventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Event', eventSchema);









