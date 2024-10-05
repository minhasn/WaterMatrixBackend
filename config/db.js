// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DATABASE_NAME || 'railway',
  process.env.DATABASE_USER || 'root',
  process.env.DATABASE_PASSWORD || 'RTYtGyNSeerXbGzCjgZKAwemeDsFAvao',
  {
    host: process.env.DATABASE_HOST || 'junction.proxy.rlwy.net',
    port: process.env.DATABASE_PORT || 10063,
    dialect: 'mysql',
    logging: false, // Set to true for SQL query logging
  }
);

// Check the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database successfully');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

module.exports = sequelize;
