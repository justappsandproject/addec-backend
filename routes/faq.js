const express = require('express');
const router = express.Router();
const { getFAQs, getFAQ, createFAQ, updateFAQ, deleteFAQ } = require('../controllers/faqController');
const { protect } = require('../middleware/auth');

router.route('/').get(getFAQs).post(protect, createFAQ);
router.route('/:id').get(getFAQ).put(protect, updateFAQ).delete(protect, deleteFAQ);

module.exports = router;










