const Contest = require('../models/Contest');

// Get all contests
exports.getContests = async (req, res) => {
  try {
    const contests = await Contest.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: contests.length, data: contests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getContest = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id);
    if (!contest) return res.status(404).json({ success: false, message: 'Contest not found' });
    res.status(200).json({ success: true, data: contest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createContest = async (req, res) => {
  try {
    const contest = await Contest.create(req.body);
    res.status(201).json({ success: true, data: contest });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateContest = async (req, res) => {
  try {
    let contest = await Contest.findById(req.params.id);
    if (!contest) return res.status(404).json({ success: false, message: 'Contest not found' });
    contest = await Contest.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: contest });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteContest = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id);
    if (!contest) return res.status(404).json({ success: false, message: 'Contest not found' });
    await contest.deleteOne();
    res.status(200).json({ success: true, message: 'Contest deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};










