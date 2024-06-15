const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/booking', bookingController.createBooking);
router.get('/property/:id/bookings', bookingController.getBookingsForProperty);
router.put('/booking/:id', bookingController.updateBooking);
router.delete('/booking/:id', bookingController.deleteBooking);

module.exports = router;
