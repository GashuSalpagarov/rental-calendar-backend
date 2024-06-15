const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

router.post('/property', propertyController.createProperty);
router.get('/properties', propertyController.getProperties);
router.delete('/property/:id', propertyController.deleteProperty);

module.exports = router;
