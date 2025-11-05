const Testimonial = require('../models/Testimonial');

exports.getAll = async (req, res) => {
  try {
    const items = await Testimonial.find().sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const item = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    let item = await Testimonial.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    await item.deleteOne();
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};










