const User = require('../models/user');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { name, phone_number, city, password_hash, email, country, avatar_url } = req.body;

  try {
    const user = await User.create({ name, phone_number, city, password_hash, email, country, avatar_url });
    res.status(201).json(user);
  } catch (error) {
    console.error('Database query error:', error.stack);
    res.status(500).json({ error: 'Database error' });
  }
};

const login = async (req, res) => {
  const { phone_number, password_hash } = req.body;

  try {
    const user = await User.findByphone_number(phone_number);

    if (!user) {
      return res.status(400).json({ error: 'Invalid phone number or password' });
    }

    const validPassword = await bcrypt.compare(Password, user.password_hash);

    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid phone number or password' });
    }

    // Return the UserId instead of User_Id
    res.status(200).json({ UserId: user.UserId, name: user.name, city: user.city });
  } catch (error) {
    console.error('Database query error:', error.stack);
    res.status(500).json({ error: 'Database error' });
  }
};


module.exports = { register, login };
