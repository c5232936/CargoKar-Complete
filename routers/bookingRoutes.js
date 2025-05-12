const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.post('/assign', bookingController.assignDriver);
router.post('/payment', bookingController.createPayment);

module.exports = router;
