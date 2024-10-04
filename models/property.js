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
        `SELECT 
          p.PropertyId, p.UserId, p.title, p.description, p.price, p.type, 
          p.address, p.zipcode, p.city, p.bedrooms, p.washrooms, p.area, 
          p.furnished, p.kitchen, p.water, p.electricity, p.status, 
          p.category, p.created_at, p.updated_at, p.geometry AS geometry, 
          p.IsPaid, pi.Photos
        FROM properties p
        LEFT JOIN  property_images pi ON p.PropertyId = pi.property_id`,
        (error, results) => {
          if (error) {
            console.error('Error retrieving properties:', error);
            return reject(error);
          }

          // Group results by property ID
          const properties = {};
          results.forEach(row => {
            const { PropertyId, UserId, title, description, price, type, address, zipcode, city, bedrooms, washrooms, area, furnished, kitchen, water, electricity, status, category, created_at, updated_at, geometry, IsPaid,Photos } = row;

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
                Photos: []
              };
            }

            if ({Photos}) {
              properties[PropertyId].images.push(Photos);
            }
          });

          resolve(Object.values(properties)); // Return an array of properties
        }
      );
    });
  }
}

module.exports = Property;
