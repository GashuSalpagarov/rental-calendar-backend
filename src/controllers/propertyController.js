const Property = require('../models/Property');

exports.getProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createProperty = async (req, res) => {
    try {
        const newProperty = new Property(req.body);
        await newProperty.save();
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
