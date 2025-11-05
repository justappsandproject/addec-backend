const Product = require('../models/Product');
const Vendor = require('../models/Vendor');

exports.getProducts = async (req, res) => {
  try {
    // If vendor is making request, only return their products
    if (req.vendor) {
      const products = await Product.find({ vendor: req.vendor.id }).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: products.length, data: products });
    }
    // Otherwise return all products
    const products = await Product.find().populate('vendor').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('vendor');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    // If vendor is creating, use their vendor ID
    if (req.vendor) {
      req.body.vendor = req.vendor.id;
      req.body.vendorName = req.vendor.name;
    }
    const product = await Product.create(req.body);
    
    // Update vendor's totalProducts count
    if (req.vendor) {
      await Vendor.findByIdAndUpdate(req.vendor.id, {
        $inc: { totalProducts: 1 }
      });
    }
    
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    
    // If vendor is updating, ensure they own the product
    if (req.vendor && product.vendor.toString() !== req.vendor.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this product' });
    }
    
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    
    // If vendor is deleting, ensure they own the product
    if (req.vendor && product.vendor.toString() !== req.vendor.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this product' });
    }
    
    await product.deleteOne();
    
    // Update vendor's totalProducts count
    if (req.vendor) {
      await Vendor.findByIdAndUpdate(req.vendor.id, {
        $inc: { totalProducts: -1 }
      });
    }
    
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};









