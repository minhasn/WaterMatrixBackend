// controllers/propertyController.js
const Property = require('../models/property');

const addProperty = async (req, res) => {
  const { title, city, price, type, description, address, zipcode, bedrooms, washrooms, area, furnished, kitchen, water, electricity, userId, geom } = req.body;

  try {
    const property = await Property.create({ title, city, price, type, description, address, zipcode, bedrooms, washrooms, area, furnished, kitchen, water, electricity, userId, geom });
    res.status(201).json(property);
  } catch (error) {
    console.error('Database query error:', error.stack);
    res.status(500).json({ error: 'Database error', details: error.message }); // Include detailed error message
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.getAll();
    res.status(200).json(properties);
  } catch (error) {
    console.error('Database query error:', error); // Log the error for debugging
    res.status(500).json({ error: 'Database error', details: error.message }); // Include detailed error message
  }
};

module.exports = { addProperty, getProperties };
