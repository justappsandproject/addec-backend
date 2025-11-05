const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor');
const User = require('../models/User');

// Middleware that accepts either vendor or admin token
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
    
    // Try to find vendor first
    const vendor = await Vendor.findById(decoded.id).select('-password');
    if (vendor && vendor.isActive) {
      req.vendor = vendor;
      return next();
    }
    
    // Try to find admin/user
    const user = await User.findById(decoded.id).select('-password');
    if (user) {
      req.user = user;
      return next();
    }
    
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};
