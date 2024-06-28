const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

router.get('/:city', propertyController.getPropertiesByCity);

module.exports = router;
