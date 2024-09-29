const Property = require('../models/property');

const addProperty = async (req, res) => {
  const { Title, City, Price, Type, Description, Zipcode, Longitude, Latitude, User_Id } = req.body;
  const image = req.file ? req.file.buffer : null;

  try {
    const property = await Property.create({ Title, City, Price, Type, Description, Image: image, Zipcode, Longitude, Latitude, User_Id });
    res.status(201).json(property);
  } catch (error) {
    console.error('Database query error:', error.stack);
    res.status(500).json({ error: 'Database error' });
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.getAll();
    res.status(200).json(properties);
  } catch (error) {
    console.error('Database query error:', error.stack);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = { addProperty, getProperties };
