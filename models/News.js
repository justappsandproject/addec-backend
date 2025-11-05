const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide news title'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please provide news category']
  },
  content: {
    type: String,
    required: [true, 'Please provide news content']
  },
  image: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: 'Admin'
  },
  date: {
    type: String,
    required: [true, 'Please provide news date']
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

newsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('News', newsSchema);










