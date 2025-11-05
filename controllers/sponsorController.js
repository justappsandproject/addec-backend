const Sponsor = require('../models/Sponsor');

exports.getSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: sponsors.length, data: sponsors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    if (!sponsor) return res.status(404).json({ success: false, message: 'Sponsor not found' });
    res.status(200).json({ success: true, data: sponsor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.create(req.body);
    res.status(201).json({ success: true, data: sponsor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateSponsor = async (req, res) => {
  try {
    let sponsor = await Sponsor.findById(req.params.id);
    if (!sponsor) return res.status(404).json({ success: false, message: 'Sponsor not found' });
    sponsor = await Sponsor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: sponsor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    if (!sponsor) return res.status(404).json({ success: false, message: 'Sponsor not found' });
    await sponsor.deleteOne();
    res.status(200).json({ success: true, message: 'Sponsor deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};










