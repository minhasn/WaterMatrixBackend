const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

// Database connection setup
const pool = mysql.createPool({
  host: 'junction.proxy.rlwy.net',
  user: 'root',
  password: 'RTYtGyNSeerXbGzCjgZKAwemeDsFAvao',
  database: 'railway',
  port: 10063,
});

// Function to create a new user
async function createUser(name, email, phoneNumber, password, city, country) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await pool.execute(
    `INSERT INTO users (name, email, phone_number, password_hash, country, city, created_at, updated_at) 
     VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [name, email, phoneNumber, hashedPassword, country, city]
  );
  return result;
}

// Function to find a user by phone number
async function findUserByPhone(phoneNumber) {
  const [rows] = await pool.execute('SELECT * FROM users WHERE phone_number = ?', [phoneNumber]);
  return rows[0]; // Return the first row
}

module.exports = { createUser, findUserByPhone };
