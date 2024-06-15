const Booking = require('../models/Booking');
const Property = require('../models/Property');

exports.createBooking = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();

        const property = await Property.findById(newBooking.property);
        property.bookings.push(newBooking._id);
        await property.save();

        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getBookingsForProperty = async (req, res) => {
    try {
        const bookings = await Booking.find({ property: req.params.id });
        res.json(bookings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

        const property = await Property.findById(deletedBooking.property);
        property.bookings.pull(deletedBooking._id);
        await property.save();

        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
