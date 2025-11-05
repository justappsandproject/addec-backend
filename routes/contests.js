const express = require('express');
const router = express.Router();
const { getContests, getContest, createContest, updateContest, deleteContest } = require('../controllers/contestController');
const { protect } = require('../middleware/auth');

router.route('/').get(getContests).post(protect, createContest);
router.route('/:id').get(getContest).put(protect, updateContest).delete(protect, deleteContest);

module.exports = router;










