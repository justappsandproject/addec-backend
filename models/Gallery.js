const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide title']
  },
  image: {
    type: String,
    required: [true, 'Please provide image']
  },
  type: {
    type: String,
    enum: ['video', 'photo', 'performance', 'behind-scenes'],
    required: [true, 'Please provide type']
  },
  date: {
    type: String,
    required: [true, 'Please provide date']
  },
  views: {
    type: Number,
    default: 0
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

gallerySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Gallery', gallerySchema);










