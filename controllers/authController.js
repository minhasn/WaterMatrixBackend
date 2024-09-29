const User = require('../models/user');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { FullName, PhoneNo, City, Password, Email, Country } = req.body;

  try {
    const user = await User.create({ FullName, PhoneNo, City, Password, Email, Country });
    res.status(201).json(user);
  } catch (error) {
    console.error('Database query error:', error.stack);
    res.status(500).json({ error: 'Database error' });
  }
};

const login = async (req, res) => {
  const { PhoneNo, Password } = req.body;

  try {
    const user = await User.findByPhoneNo(PhoneNo);

    if (!user) {
      return res.status(400).json({ error: 'Invalid phone number or password' });
    }

    const validPassword = await bcrypt.compare(Password, user.Password);

    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid phone number or password' });
    }

    // Return the UserId instead of User_Id
    res.status(200).json({ UserId: user.UserId, FullName: user.FullName, City: user.City });
  } catch (error) {
    console.error('Database query error:', error.stack);
    res.status(500).json({ error: 'Database error' });
  }
};


module.exports = { register, login };
