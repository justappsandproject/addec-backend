const Volunteer = require('../models/Volunteer');

exports.getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: volunteers.length, data: volunteers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) return res.status(404).json({ success: false, message: 'Volunteer not found' });
    res.status(200).json({ success: true, data: volunteer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.create(req.body);
    res.status(201).json({ success: true, data: volunteer });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateVolunteer = async (req, res) => {
  try {
    let volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) return res.status(404).json({ success: false, message: 'Volunteer not found' });
    volunteer = await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: volunteer });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) return res.status(404).json({ success: false, message: 'Volunteer not found' });
    await volunteer.deleteOne();
    res.status(200).json({ success: true, message: 'Volunteer deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};










