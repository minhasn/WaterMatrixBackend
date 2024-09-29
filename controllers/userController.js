const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Get all users
exports.getAllUsers = (req, res) => {
    User.getAllUsers((err, users) => {
        if (err) return res.status(500).json({ message: 'Error retrieving users' });
        res.status(200).json(users);
    });
};

// Get user by ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;
    User.getUserById(userId, (err, user) => {
        if (err) return res.status(500).json({ message: 'Error retrieving user' });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    });
};

// Create new user
exports.createUser = (req, res) => {
    const userData = req.body;
    User.createUser(userData, (err, newUser) => {
        if (err) return res.status(400).json({ message: 'Error creating user' });
        res.status(201).json(newUser);
    });
};

// Update user
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    User.updateUser(userId, userData, (err, updatedUser) => {
        if (err) return res.status(400).json({ message: 'Error updating user' });
        res.status(200).json(updatedUser);
    });
};

// Delete user
exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    User.deleteUser(userId, (err, success) => {
        if (err) return res.status(500).json({ message: 'Error deleting user' });
        if (!success) return res.status(404).json({ message: 'User not found' });
        res.status(204).send(); // No content
    });
};

// Login User
exports.loginUser = async (req, res) => {
    const { phone_number, password } = req.body;

    try {
        // Find the user by phone number
        const user = await User.findOne({ where: { phone_number } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid phone number or password.' });
        }

        // Compare password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid phone number or password.' });
        }

        // Return user data (excluding sensitive info like password)
        res.status(200).json({
            UserId: user.UserId,
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            country: user.country,
            city: user.city,
            avatar_url: user.avatar_url,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
