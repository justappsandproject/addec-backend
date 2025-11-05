const News = require('../models/News');

exports.getNews = async (req, res) => {
  try {
    const items = await News.find().sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSingleNews = async (req, res) => {
  try {
    const item = await News.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'News not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createNews = async (req, res) => {
  try {
    const item = await News.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    let item = await News.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'News not found' });
    item = await News.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const item = await News.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'News not found' });
    await item.deleteOne();
    res.json({ success: true, message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};