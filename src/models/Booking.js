const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    platform: { type: String, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
