const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database');
});

// Login Route
app.post('/login', async (req, res) => {
  const { phone_number, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE phone_number = ?';
    db.query(query, [phone_number], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send({ message: 'Internal server error.' });
      }
      if (results.length === 0) {
        return res.status(401).send({ message: 'Invalid phone number or password.' });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid phone number or password.' });
      }

      res.send({
        UserId: user.UserId,
        name: user.name,
        email: user.email,
        // Other user details if needed
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ message: 'Internal server error.' });
  }
});

// Registration Route
app.post('/register', async (req, res) => {
  const { name, email, phone_number, password, country, city } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, phone_number, password_hash, country, city) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [name, email, phone_number, hashedPassword, country, city], (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send({ message: 'Internal server error.' });
      }
      res.status(201).send({ message: 'User registered successfully.' });
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send({ message: 'Internal server error.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
