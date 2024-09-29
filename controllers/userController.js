const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { name, email, phone_number, password, city, country } = req.body;

  try {
    const newUser = await User.createUser(name, email, phone_number, password, city, country);
    res.status(201).json({ message: 'User registered successfully', userId: newUser.insertId });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email or phone number already in use.' });
    }
    res.status(500).json({ message: 'An error occurred.', error });
  }
};

exports.loginUser = async (req, res) => {
  const { phone_number, password } = req.body;

  try {
    const user = await User.findUserByPhone(phone_number);
    if (!user) {
      return res.status(401).json({ message: 'Invalid phone number or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid phone number or password.' });
    }

    // Send user data or a token, if using JWT
    res.status(200).json({ UserId: user.UserId, message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.', error });
  }
};
