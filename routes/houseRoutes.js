// routes/houseRoutes.js

const express = require('express');
const router = express.Router();
const houseController = require('../controllers/houseController');

// POST route to submit house details
router.post('/submit', houseController.submitHouseDetails);

module.exports = router;
