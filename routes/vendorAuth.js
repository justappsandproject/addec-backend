const express = require('express');
const router = express.Router();
const { login, getMe } = require('../controllers/vendorAuthController');
const { protect } = require('../middleware/vendorAuth');

router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;

