const client = require('../config/db');

class PropertyImage {
  static async create({ propertyId, imageUrl }) {
    const result = await client.query(
      `INSERT INTO "property_images" (property_id, image_url) VALUES ($1, $2) RETURNING id`,
      [propertyId, imageUrl]
    );
    return result.rows[0];  // This will return the new image ID
  }

  static async getByPropertyId(propertyId) {
    const result = await client.query(
      'SELECT * FROM "property_images" WHERE property_id = $1',
      [propertyId]
    );
    return result.rows;
  }

  static async delete(id) {
    await client.query('DELETE FROM "property_images" WHERE id = $1', [id]);
    return { message: 'Image deleted successfully' };
  }
}

module.exports = PropertyImage;