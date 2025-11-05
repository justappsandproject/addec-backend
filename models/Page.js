const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide page title'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Please provide page slug'],
    unique: true,
    trim: true,
    lowercase: true
  },
  content: {
    type: String,
    required: [true, 'Please provide page content']
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

pageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Page', pageSchema);

