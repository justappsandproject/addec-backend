const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, delete: deleteTestimonial } = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');

router.route('/').get(getAll).post(protect, create);
router.route('/:id').get(getOne).put(protect, update).delete(protect, deleteTestimonial);

module.exports = router;










