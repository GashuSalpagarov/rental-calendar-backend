const axios = require('axios');
const Booking = require('../models/Booking');

async function syncAirbnb(property) {
    try {
        const response = await axios.get(`https://api.airbnb.com/v2/listings/${property.platformIds.airbnb}/calendar`);
        const bookings = response.data.calendar;

        for (let booking of bookings) {
            const existingBooking = await Booking.findOne({
                property: property._id,
                startDate: booking.start_date,
                endDate: booking.end_date,
                platform: 'Airbnb'
            });

            if (!existingBooking) {
                const newBooking = new Booking({
                    property: property._id,
                    startDate: booking.start_date,
                    endDate: booking.end_date,
                    platform: 'Airbnb',
                    status: booking.status
                });

                await newBooking.save();
                property.bookings.push(newBooking._id);
                await property.save();
            }
        }
    } catch (error) {
        console.error(`Error syncing with Airbnb: ${error.message}`);
    }
}

module.exports = syncAirbnb;
