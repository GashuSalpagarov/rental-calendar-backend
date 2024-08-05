const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);
router.get('', propertyController.getProperties);
router.post('/property', propertyController.createProperty);
router.delete('/property/:id', propertyController.deleteProperty);

module.exports = router;
