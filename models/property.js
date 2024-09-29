const client = require('../config/db');

class Property {
  static async create({ title, city, price, type, description, address, zipcode, bedrooms, washrooms, area, furnished, kitchen, water, electricity, userId, geom }) {
    const result = await client.query(
      `INSERT INTO "properties" (
        "UserId", "title", "description", "price", "type", "address", "zipcode", "city", "geom", 
        "bedrooms", "washrooms", "area", "furnished", "kitchen", "water", "electricity", "status", "category"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, ST_SetSRID(ST_MakePoint($9, $10), 4326), 
        $11, $12, $13, $14, $15, $16, $17, 'Unpaid', NULL)
      RETURNING "PropertId"`,
      [userId, title, description, price, type, address, zipcode, city, geom.longitude, geom.latitude, bedrooms, washrooms, area, furnished, kitchen, water, electricity]
    );

    return result.rows[0]; // This will return the PropertId
  }

  static async getAll() {
    const result = await client.query('SELECT * FROM "properties"');
    return result.rows;
  }
}

module.exports = Property;