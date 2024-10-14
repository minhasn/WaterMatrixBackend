const Property = require('../models/property');
const pool = require('../config/db');

const addProperty = async (req, res) => {
  const { title, city, price, type, description, address, zipcode, bedrooms, washrooms, area, UserId } = req.body;
  const furnished = req.body.furnished === 'true' ? 1 : 0;
  const kitchen = req.body.kitchen === 'true' ? 1 : 0;
  const water = req.body.water === 'true' ? 1 : 0;
  const electricity = req.body.electricity === 'true' ? 1 : 0;
  const longitude = parseFloat(req.body.longitude);
  const latitude = parseFloat(req.body.latitude);
  const geometry = `POINT(${longitude} ${latitude})`;
  
  if (isNaN(longitude) || isNaN(latitude)) {
    return res.status(400).json({ error: 'Invalid longitude or latitude' });
  }
  
  const images = req.files.map(file => `/${file.path}`);
    try {
    const propertyId = await Property.create({ 
      title, city, price, type, description, address, zipcode, 
      bedrooms, washrooms, area, furnished, kitchen, water, 
      electricity, UserId, geometry, longitude, latitude
    });

    if (images.length > 0) {
      const insertImagePromises = images.map(photo => {
        return new Promise((resolve, reject) => {
          pool.query(
            `INSERT INTO property_images (property_id, Photos) VALUES (?, ?)`,
            [propertyId, photo],
            (error) => {
              if (error) {
                console.error('Error inserting image:', error);
                return reject(error);
              }
              resolve();
            }
          );
        });
      });
      await Promise.all(insertImagePromises);
    }

    res.status(201).json({ propertyId });
  } catch (error) {
    console.error('Database query error:', error.stack);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.getAll();
    res.status(200).json(properties);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.getById(propertyId);
    console.log('Fetching property with ID:', propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { addProperty, getProperties, getPropertyById };

