const express = require('express');
const router = express.Router();
const {
  uploadMedia,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMedia
} = require('../controllers/mediaController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Upload media (single file)
router.post('/upload', protect, upload.single('file'), uploadMedia);

// Get all media (with pagination and filters)
router.get('/', protect, getMedia);

// Get single media item
router.get('/:id', protect, getMediaById);

// Update media metadata
router.put('/:id', protect, updateMedia);

// Delete media
router.delete('/:id', protect, deleteMedia);

module.exports = router;


