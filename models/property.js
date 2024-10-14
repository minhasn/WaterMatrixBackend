const pool = require('../config/db');

class Property {
  static create(propertyData) {
    return new Promise((resolve, reject) => {
      const { title, city, price, type, description, address, zipcode, bedrooms, washrooms, area, furnished, kitchen, water, electricity, UserId, geometry, category } = propertyData;
      
      const query = `
        INSERT INTO properties (
          UserId, title, description, price, type, address, zipcode, city, 
          bedrooms, washrooms, area, furnished, kitchen, water, electricity, 
          status, category, geometry, IsPaid
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Dis-Conn', ?, 
          ST_GeomFromText(CONCAT('POINT(', ?, ' ', ?, ')')), 0
        )
      `;
      
      const values = [
        UserId, title, description, price, type, address, zipcode, city,
        bedrooms, washrooms, area, furnished, kitchen, water, electricity,
        category, geometry.longitude, geometry.latitude
      ];

      pool.query(query, values, (error, results) => {
        if (error) {
          console.error('Error inserting property:', error);
          return reject(error);
        }
        resolve(results.insertId);
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT 
          p.*, 
          ST_X(p.geometry) AS longitude,
          ST_Y(p.geometry) AS latitude,
          pi.Photos
        FROM properties p
        LEFT JOIN property_images pi ON p.PropertyId = pi.property_id`,
        (error, results) => {
          if (error) {
            console.error('Error retrieving properties:', error);
            return reject(error);
          }

          const properties = {};
          results.forEach(function(row) {
            const PropertyId = row.PropertyId;
            const longitude = row.longitude;
            const latitude = row.latitude;
            const Photos = row.Photos;
            
            if (!properties[PropertyId]) {
              properties[PropertyId] = Object.assign({}, row, {
                geometry: { x: longitude, y: latitude },
                Photos: []
              });
              delete properties[PropertyId].longitude;
              delete properties[PropertyId].latitude;
            }

            if (Photos) {
              properties[PropertyId].Photos.push(Photos);
            }
          });

          resolve(Object.values(properties));
        }
      );
    });
  }

  static getById(propertyId) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT 
          p.*, 
          ST_X(p.geometry) AS longitude,
          ST_Y(p.geometry) AS latitude,
          GROUP_CONCAT(pi.Photos) AS Photos
        FROM properties p
        LEFT JOIN property_images pi ON p.PropertyId = pi.property_id
        WHERE p.PropertyId = ?
        GROUP BY p.PropertyId`,
        [propertyId],
        (error, results) => {
          if (error) {
            console.error('Error retrieving property:', error);
            return reject(error);
          }

          if (results.length === 0) {
            return resolve(null); // Property not found
          }

          var property = results[0];
          property.geometry = { 
            x: property.longitude, 
            y: property.latitude 
          };
          delete property.longitude;
          delete property.latitude;

          if (property.Photos) {
            property.Photos = property.Photos.split(',');
          } else {
            property.Photos = [];
          }

          resolve(property);
        }
      );
    });
  }
}

module.exports = Property;
