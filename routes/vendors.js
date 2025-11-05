const express = require('express');
const router = express.Router();
const { getVendors, getVendor, createVendor, updateVendor, deleteVendor } = require('../controllers/vendorController');
const { protect } = require('../middleware/auth');

router.route('/').get(getVendors).post(protect, createVendor);
router.route('/:id').get(getVendor).put(protect, updateVendor).delete(protect, deleteVendor);

module.exports = router;










