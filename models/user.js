const { v4: uuidv4 } = require('uuid');
const client = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create({ name, phone_number, city, password, email, country, avatar_url }) {
    const password_hash = await bcrypt.hash(password, 10);
    const result = await client.query(
      'INSERT INTO "User" ("name", "phone_number", "city", "password_hash", "email", "country") VALUES ($1, $2, $3, $4, $5, $6) RETURNING "UserId", "name", "email"',
      [name, phone_number, city, password_hash, email, country]
    );
    return result.rows[0];  // This will return the UserId along with the other fields
  }

  static async findByPhoneNumber(phone_number) {
    const result = await client.query(
      'SELECT * FROM "User" WHERE "phone_number" = $1',
      [phone_number]
    );
    return result.rows[0];
  }

  static async delete(userId) {
    await client.query('DELETE FROM "User" WHERE "UserId" = $1', [userId]);
    return { message: 'User deleted successfully' };
  }
}

module.exports = User;
