// models/House.js

const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    squareFeet: { type: Number, required: true },
    houseType: { type: String, required: true }
});

module.exports = mongoose.model('House', houseSchema);
