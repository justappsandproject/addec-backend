const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: [true, 'Please provide filename']
  },
  originalName: {
    type: String,
    required: [true, 'Please provide original filename']
  },
  path: {
    type: String,
    required: [true, 'Please provide file path']
  },
  url: {
    type: String,
    required: [true, 'Please provide file URL']
  },
  mimeType: {
    type: String,
    required: [true, 'Please provide MIME type']
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    required: [true, 'Please provide media type']
  },
  size: {
    type: Number,
    required: [true, 'Please provide file size']
  },
  width: {
    type: Number
  },
  height: {
    type: Number
  },
  duration: {
    type: Number // For videos in seconds
  },
  alt: {
    type: String,
    default: ''
  },
  caption: {
    type: String,
    default: ''
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

mediaSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Media', mediaSchema);


