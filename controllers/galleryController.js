const Gallery = require('../models/Gallery');

exports.getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: gallery.length, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateGalleryItem = async (req, res) => {
  try {
    let item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    await item.deleteOne();
    res.status(200).json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};










