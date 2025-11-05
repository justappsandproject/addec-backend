const FAQ = require('../models/FAQ');

exports.getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: faqs.length, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
    res.status(200).json({ success: true, data: faq });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createFAQ = async (req, res) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateFAQ = async (req, res) => {
  try {
    let faq = await FAQ.findById(req.params.id);
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
    faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: faq });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
    await faq.deleteOne();
    res.status(200).json({ success: true, message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};










