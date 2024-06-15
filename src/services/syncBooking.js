const axios = require('axios');
const Booking = require('../models/Booking');

async function syncBooking(property) {
    try {
        const response = await axios.get(`https://api.booking.com/property/${property.platformIds.booking}/calendar`);
        const bookings = response.data.calendar;

        for (let booking of bookings) {
            const existingBooking = await Booking.findOne({
                property: property._id,
                startDate: booking.start_date,
                endDate: booking.end_date,
                platform: 'Booking.com'
            });

            if (!existingBooking) {
                const newBooking = new Booking({
                    property: property._id,
                    startDate: booking.start_date,
                    endDate: booking.end_date,
                    platform: 'Booking.com',
                    status: booking.status
                });

                await newBooking.save();
                property.bookings.push(newBooking._id);
                await property.save();
            }
        }
    } catch (error) {
        console.error(`Error syncing with Booking.com: ${error.message}`);
    }
}

module.exports = syncBooking;
