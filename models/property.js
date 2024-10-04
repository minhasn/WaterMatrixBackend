const pool = require('../config/db');

class Property {
  static async create({ title, city, price, type, description, address, zipcode, bedrooms, washrooms, area, furnished, kitchen, water, electricity, userId, geom }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO properties (
          UserId, title, description, price, type, address, zipcode, city, geom, 
          bedrooms, washrooms, area, furnished, kitchen, water, electricity, status, category
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ST_SetSRID(ST_MakePoint(?, ?), 32643), 
          ?, ?, ?, ?, ?, ?, ?, 'IsPaid', NULL)`,
        [userId, title, description, price, type, address, zipcode, city, geom.longitude, geom.latitude, bedrooms, washrooms, area, furnished, kitchen, water, electricity],
        (error, results) => {
          if (error) {
            console.error('Error inserting property:', error);
            return reject(error);
          }
          resolve(results.insertId); // Return the PropertyId
        }
      );
    });
  }

  static async getAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT p.*, pi.image_url FROM properties p
         LEFT JOIN property_images pi ON p.PropertyId = pi.property_id`,
        (error, results) => {
          if (error) {
            console.error('Error retrieving properties:', error);
            return reject(error);
          }

          // Group results by property ID
          const properties = {};
          results.forEach(row => {
            const { PropertyId, title, description, price, type, address, zipcode, city, bedrooms, washrooms, area, furnished, kitchen, water, electricity, status, category, image_url } = row;

            if (!properties[PropertyId]) {
              properties[PropertyId] = {
                PropertyId,
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
                images: []
              };
            }

            if (image_url) {
              properties[PropertyId].images.push(image_url);
            }
          });

          resolve(Object.values(properties)); // Return an array of properties
        }
      );
    });
  }
}

module.exports = Property;
