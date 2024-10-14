prooerty.js 
const pool = require('../config/db');

class Property {
  static async create({ title, city, price, type, description, address, zipcode, bedrooms, washrooms, area, furnished, kitchen, water, electricity, UserId, geometry,category }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO properties (
         PropertyId, UserId, title, description, price, type, address, zipcode, city, bedrooms, washrooms, area, furnished, kitchen, water, electricity, status, category, created_at, updated_at, geometry, IsPaid)
VALUES(0, 0, '', '', 0, '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 'Unpaid', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, 0)`,
        [UserId, title, description, price, type, address, zipcode, city, geometry.longitude, geometry.latitude, bedrooms, washrooms, area, furnished, kitchen, water, electricity,category],
        (error, results) => {
          if (error) {
            console.error('Error inserting property:', error);
            return reject(error);
          }
          resolve(results.insertId);
        }
      );
    });
  }

  static async getAll() {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT 
              p.PropertyId, p.UserId, p.title, p.description, p.price, p.type, 
              p.address, p.zipcode, p.city, p.bedrooms, p.washrooms, p.area, 
              p.furnished, p.kitchen, p.water, p.electricity, p.status, 
              p.category, p.created_at, p.updated_at, p.geometry AS geometry, 
              p.IsPaid, pi.Photos
            FROM properties p
            LEFT JOIN property_images pi ON p.PropertyId = pi.property_id`,
            (error, results) => {
                if (error) {
                    console.error('Error retrieving properties:', error);
                    return reject(error);
                }

                // Group results by property ID
                const properties = {};
                results.forEach(row => {
                    const { PropertyId, UserId, title, description, price, type, address, zipcode, city, bedrooms, washrooms, area, furnished, kitchen, water, electricity, status, category, created_at, updated_at, geometry, IsPaid, Photos } = row;

                    if (!properties[PropertyId]) {
                        properties[PropertyId] = {
                            PropertyId,
                            UserId,
                            title,
                            description,
                            price,
                            type,
                            address,
                            zipcode,
                            city,
                            bedrooms,
                            washrooms,
                            area,
                            furnished,
                            kitchen,
                            water,
                            electricity,
                            status,
                            category,
                            created_at,
                            updated_at,
                            geometry,
                            IsPaid,
                            Photos: [] // Initialize Photos array
                        };
                    }

                    // Check if Photos exists and push it to the Photos array
                    if (Photos) {
                        properties[PropertyId].Photos.push(Photos); // Ensure we're pushing into the right array
                    }
                });

                resolve(Object.values(properties)); // Return an array of properties
            }
        );
    });
}
static async getById(propertyId) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT 
        p.PropertyId, p.UserId, p.title, p.description, p.price, p.type, 
        p.address, p.zipcode, p.city, p.bedrooms, p.washrooms, p.area, 
        p.furnished, p.kitchen, p.water, p.electricity, p.status, 
        p.category, p.created_at, p.updated_at, 
        p.geometry AS geometry, 
        GROUP_CONCAT(pi.Photos) AS Photos
      FROM properties p
      LEFT JOIN property_images pi ON p.PropertyId = pi.property_id
      WHERE p.PropertyId = ?
      GROUP BY 
        p.PropertyId, p.UserId, p.title, p.description, p.price, p.type, 
        p.address, p.zipcode, p.city, p.bedrooms, p.washrooms, p.area, 
        p.furnished, p.kitchen, p.water, p.electricity, p.status, 
        p.category, p.created_at, p.updated_at`,
      [propertyId],
      (error, results) => {
        if (error) {
          console.error('Error retrieving property:', error);
          return reject(error);
        }

        if (results.length === 0) {
          return resolve(null); // Property not found
        }

        const property = results[0];


        resolve(property);
      }
    );
  });
}
}

module.exports = Property;
=================================================================================================================
Property Controller.js 
const Property = require('../models/property');
const pool = require('../config/db');

const addProperty = async (req, res) => {
  const { title, city, price, type, description, address, zipcode, bedrooms, washrooms, area, furnished, kitchen, water, electricity, UserId } = req.body;
  const longitude = parseFloat(req.body.longitude); // Ensure these are sent in the request
  const latitude = parseFloat(req.body.latitude);
  const geom = { longitude, latitude };
  const images = req.files.map(file => `/${file.path}`);

  try {
    const propertyId = await Property.create({ title, city, price, type, description, address, zipcode, bedrooms, washrooms, area, furnished, kitchen, water, electricity, userId, geometry });

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

