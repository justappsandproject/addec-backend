const express = require('express');
const router = express.Router();
const { getVolunteers, getVolunteer, createVolunteer, updateVolunteer, deleteVolunteer } = require('../controllers/volunteerController');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getVolunteers).post(createVolunteer);
router.route('/:id').get(protect, getVolunteer).put(protect, updateVolunteer).delete(protect, deleteVolunteer);

module.exports = router;










