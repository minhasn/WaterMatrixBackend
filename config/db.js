const mysql = require('mysql2');
require('dotenv').config();

// Create MySQL connection
const connection = mysql.createConnection({
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'RTYtGyNSeerXbGzCjgZKAwemeDsFAvao',
  host: process.env.DATABASE_HOST || 'junction.proxy.rlwy.net',
  port: process.env.DATABASE_PORT || 10063,
  database: process.env.DATABASE_NAME || 'railway',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.stack);
    return;
  }
  console.log('Connected to MySQL database successfully');
});

module.exports = connection;
