const express = require('express');
const router = express.Router();
const { getPages, getPage, createPage, updatePage, deletePage } = require('../controllers/pageController');
const { protect } = require('../middleware/auth');

router.route('/').get(getPages).post(protect, createPage);
router.route('/:slug').get(getPage);
router.route('/id/:id').put(protect, updatePage).delete(protect, deletePage);

module.exports = router;

