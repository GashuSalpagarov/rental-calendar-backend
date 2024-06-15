const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    platformIds: {
        airbnb: { type: String },
        booking: { type: String }
    },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
});

module.exports = mongoose.model('Property', propertySchema);
