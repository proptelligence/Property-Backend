const propertiesByCity = require('../data/properties');

exports.getPropertiesByCity = (req, res) => {
  const city = req.params.city;
  const properties = propertiesByCity[city];

  if (properties) {
    res.status(200).json(properties);
  } else {
    res.status(404).json({ message: 'City not found' });
  }
};
