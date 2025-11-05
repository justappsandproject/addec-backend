const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor');

// Protect routes - JWT authentication for vendors
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.vendor = await Vendor.findById(decoded.id).select('-password');
    
    if (!req.vendor) {
      return res.status(401).json({
        success: false,
        message: 'Vendor not found'
      });
    }

    if (!req.vendor.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your vendor account has been deactivated'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

