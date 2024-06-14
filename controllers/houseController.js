// controllers/houseController.js

const House = require('../models/House');

exports.submitHouseDetails = async (req, res) => {
    try {
        const { name, email, mobile, squareFeet, houseType } = req.body;
        
        const house = new House({
            name,
            email,
            mobile,
            squareFeet,
            houseType
        });

        await house.save();

        res.status(201).json({ message: 'House details submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
