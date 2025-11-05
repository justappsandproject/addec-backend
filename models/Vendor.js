const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide vendor name'],
    trim: true,
    unique: true
  },
  username: {
    type: String,
    required: [true, 'Please provide username'],
    unique: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  category: {
    type: String,
    required: [true, 'Please provide vendor category']
  },
  rating: {
    type: Number,
    default: 0
  },
  totalProducts: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
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

// Hash password before saving
vendorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    this.updatedAt = Date.now();
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  this.updatedAt = Date.now();
  next();
});

// Compare password method
vendorSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Vendor', vendorSchema);









