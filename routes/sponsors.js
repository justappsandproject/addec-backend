const express = require('express');
const router = express.Router();
const { getSponsors, getSponsor, createSponsor, updateSponsor, deleteSponsor } = require('../controllers/sponsorController');
const { protect } = require('../middleware/auth');

router.route('/').get(getSponsors).post(protect, createSponsor);
router.route('/:id').get(getSponsor).put(protect, updateSponsor).delete(protect, deleteSponsor);

module.exports = router;










