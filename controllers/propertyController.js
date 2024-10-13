const Property = require('../models/property');
const pool = require('../config/db');

const addProperty = async (req, res) => {
  try {
    const { 
      title, 
      city, 
      price, 
      type, 
      description, 
      address, 
      zipcode, 
      bedrooms, 
      washrooms, 
      area, 
      furnished, 
      kitchen, 
      water, 
      electricity, 
      UserId 
    } = req.body;

    const parsedData = {
      title,
      city,
      price: parseFloat(price),
      type,
      description,
      address,
      zipcode,
      bedrooms: parseInt(bedrooms, 10),
      washrooms: parseInt(washrooms, 10),
      area: parseFloat(area),
      furnished: furnished === 'true' || furnished === true ? 1 : 0,
      kitchen: kitchen === 'true' || kitchen === true ? 1 : 0,
      water: water === 'true' || water === true ? 1 : 0,
      electricity: electricity === 'true' || electricity === true ? 1 : 0,
      UserId: parseInt(UserId, 10),
      geometry: {
        longitude: parseFloat(req.body.longitude),
        latitude: parseFloat(req.body.latitude)
      }
    };

    console.log('Parsed property data:', JSON.stringify(parsedData, null, 2));

    if (isNaN(parsedData.geometry.longitude) || isNaN(parsedData.geometry.latitude)) {
      return res.status(400).json({ error: 'Invalid longitude or latitude' });
    }

    const propertyId = await Property.create(parsedData);

    const images = req.files.map(file => `/${file.path}`);

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
