const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

router.post('/send-email', contactController.sendEmail);

module.exports = router;
