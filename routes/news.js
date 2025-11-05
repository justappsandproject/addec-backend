const express = require('express');
const router = express.Router();
const { getNews, getSingleNews, createNews, updateNews, deleteNews } = require('../controllers/newsController');
const { protect } = require('../middleware/auth');

router.route('/').get(getNews).post(protect, createNews);
router.route('/:id').get(getSingleNews).put(protect, updateNews).delete(protect, deleteNews);

module.exports = router;










