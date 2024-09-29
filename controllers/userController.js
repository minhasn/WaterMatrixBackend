// userController.js
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.getAllUsers = (req, res) => {
    User.getAllUsers((err, users) => {
        if (err) return res.status(500).json({ message: 'Error retrieving users' });
        res.status(200).json(users);
    });
};

exports.getUserById = (req, res) => {
    const userId = req.params.id;
    User.getUserById(userId, (err, user) => {
        if (err) return res.status(500).json({ message: 'Error retrieving user' });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    });
};

exports.createUser = async (req, res) => {
    try {
        const userData = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password_hash, 10); // 10 salt rounds

        // Replace password_hash with the hashed password
        const newUserData = { ...userData, password_hash: hashedPassword };

        User.createUser(newUserData, (err, newUser) => {
            if (err) return res.status(400).json({ message: 'Error creating user' });
            res.status(201).json(newUser);
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    User.updateUser(userId, userData, (err, updatedUser) => {
        if (err) return res.status(400).json({ message: 'Error updating user' });
        res.status(200).json(updatedUser);
    });
};

exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    User.deleteUser(userId, (err, success) => {
        if (err) return res.status(500).json({ message: 'Error deleting user' });
        if (!success) return res.status(404).json({ message: 'User not found' });
        res.status(204).send(); // No content
    });
};
