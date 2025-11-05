const Vendor = require('../models/Vendor');

exports.getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: vendors.length, data: vendors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).select('-password');
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });
    res.status(200).json({ success: true, data: vendor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createVendor = async (req, res) => {
  try {
    // Convert isActive string to boolean if needed
    if (req.body.isActive === 'true') req.body.isActive = true;
    if (req.body.isActive === 'false') req.body.isActive = false;
    
    const vendor = await Vendor.create(req.body);
    // Don't send password in response
    const vendorResponse = vendor.toObject();
    delete vendorResponse.password;
    res.status(201).json({ success: true, data: vendorResponse });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateVendor = async (req, res) => {
  try {
    let vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });
    
    // Don't update password if not provided or empty
    if (!req.body.password || req.body.password.trim() === '') {
      delete req.body.password;
    }
    
    // Convert isActive string to boolean if needed
    if (req.body.isActive === 'true') req.body.isActive = true;
    if (req.body.isActive === 'false') req.body.isActive = false;
    
    vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: vendor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ success: false, message: 'Vendor not found' });
    await vendor.deleteOne();
    res.status(200).json({ success: true, message: 'Vendor deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};









