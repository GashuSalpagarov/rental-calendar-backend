const express = require('express');
const router = express.Router();
const syncAirbnb = require('../services/syncAirbnb');
const syncBooking = require('../services/syncBooking');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);
router.post('/sync/airbnb/:propertyId', syncAirbnb);
router.post('/sync/booking/:propertyId', syncBooking);

module.exports = router;
