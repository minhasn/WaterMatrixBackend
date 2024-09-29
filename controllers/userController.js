const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Fetch all users
exports.getAllUsers = (req, res) => {
    User.getAllUsers((err, users) => {
        if (err) return res.status(500).json({ message: 'Error retrieving users' });
        res.status(200).json(users);
    });
};

// Fetch a user by ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;
    User.getUserById(userId, (err, user) => {
        if (err) return res.status(500).json({ message: 'Error retrieving user' });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    });
};

// Create a new user
exports.createUser = (req, res) => {
    const userData = req.body;
    User.createUser(userData, (err, newUser) => {
        if (err) return res.status(400).json({ message: 'Error creating user' });
        res.status(201).json(newUser);
    });
};

// Update a user by ID
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    User.updateUser(userId, userData, (err, updatedUser) => {
        if (err) return res.status(400).json({ message: 'Error updating user' });
        res.status(200).json(updatedUser);
    });
};

// Delete a user by ID
exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    User.deleteUser(userId, (err, success) => {
        if (err) return res.status(500).json({ message: 'Error deleting user' });
        if (!success) return res.status(404).json({ message: 'User not found' });
        res.status(204).send(); // No content
    });
};

// Login user - This is the function we added
exports.loginUser = (req, res) => {
    const { phone_number, password } = req.body;

    User.getUserByPhoneNumber(phone_number, async (err, user) => {
        if (err) return res.status(500).json({ message: 'Error retrieving user' });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid phone number or password' });
        }

        // If passwords match, send success response
        res.status(200).json({
            UserId: user.UserId,
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            avatar_url: user.avatar_url,
            country: user.country,
            city: user.city,
        });
    });
};
