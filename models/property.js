const pool = require('../config/db');

class Property {
  static async create({ title, city, price, type, description, address, zipcode, bedrooms, washrooms, area, furnished, kitchen, water, electricity, UserId, geometry }) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO properties (
          UserId, title, description, price, type, address, zipcode, city, 
          bedrooms, washrooms, area, furnished, kitchen, water, electricity, 
          status, category, created_at, updated_at, geometry, IsPaid
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
          'Unpaid', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 
          ST_GeomFromText(CONCAT('POINT(', ?, ' ', ?, ')'), 4326), 0
        )
      `;

      const values = [
        UserId, title, description, price, type, address, zipcode, city,
        bedrooms, washrooms, area, furnished, kitchen, water, electricity,
        geometry.longitude, geometry.latitude
      ];

      console.log('Inserting property with values:', JSON.stringify(values, null, 2));

      pool.query(query, values, (error, results) => {
        if (error) {
          console.error('Error inserting property:', error);
          return reject(error);
        }
        resolve(results.insertId);
      });
    });
  }

  static async getAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT 
          p.PropertyId, p.UserId, p.title, p.description, p.price, p.type, 
          p.address, p.zipcode, p.city, p.bedrooms, p.washrooms, p.area, 
          p.furnished, p.kitchen, p.water, p.electricity, p.status, 
          p.category, p.created_at, p.updated_at, 
          ST_AsText(p.geometry) AS geometry, 
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
              properties[PropertyId].Photos.push(Photos);
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
          ST_AsText(p.geometry) AS geometry, 
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
