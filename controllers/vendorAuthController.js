const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Vendor Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate username and password
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username and password'
      });
    }

    // Check vendor (by username or email)
    const vendor = await Vendor.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: username.toLowerCase() }
      ]
    }).select('+password');

    if (!vendor) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if vendor is active
    if (!vendor.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your vendor account has been deactivated. Please contact support.'
      });
    }

    // Check password
    const isMatch = await vendor.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(vendor._id);

    res.status(200).json({
      success: true,
      token,
      vendor: {
        id: vendor._id,
        name: vendor.name,
        username: vendor.username,
        email: vendor.email,
        category: vendor.category,
        role: 'vendor'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get current vendor
exports.getMe = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor.id);

    res.status(200).json({
      success: true,
      vendor: {
        id: vendor._id,
        name: vendor.name,
        username: vendor.username,
        email: vendor.email,
        category: vendor.category,
        rating: vendor.rating,
        totalProducts: vendor.totalProducts,
        description: vendor.description,
        isActive: vendor.isActive,
        createdAt: vendor.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

