// config/db.js
const mysql = require('mysql2');
require('dotenv').config();

// Create MySQL connection pool
const pool = mysql.createPool({
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'RTYtGyNSeerXbGzCjgZKAwemeDsFAvao',
  host: process.env.DATABASE_HOST || 'junction.proxy.rlwy.net',
  port: process.env.DATABASE_PORT || 10063,
  database: process.env.DATABASE_NAME || 'railway',
  waitForConnections: true,
  connectionLimit: 10, // You can adjust this based on your needs
  queueLimit: 0, // 0 means no limit
});

// Check pool connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection error:', err.stack);
    return;
  }
  console.log('Connected to MySQL database successfully');

  // Release the connection back to the pool after the check
  connection.release();
});

module.exports = pool;
