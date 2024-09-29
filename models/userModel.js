// userModel.js
const db = require('../config/db');

const User = {
    getAllUsers: (callback) => {
        // Ensure the table name is consistently capitalized
        db.query('SELECT * FROM User', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    
    getUserById: (userId, callback) => {
        // Make sure the table name matches
        db.query('SELECT * FROM User WHERE UserId = ?', [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    createUser: (userData, callback) => {
        // Ensure the table name is consistently capitalized
        db.query('INSERT INTO User SET ?', userData, (err, results) => {
            if (err) return callback(err);
            callback(null, { UserId: results.insertId, ...userData });
        });
    },

    updateUser: (userId, userData, callback) => {
        // Ensure the table name is consistently capitalized
        db.query('UPDATE User SET ? WHERE UserId = ?', [userData, userId], (err, results) => {
            if (err) return callback(err);
            callback(null, { UserId: userId, ...userData });
        });
    },

    deleteUser: (userId, callback) => {
        // Make sure the table name matches
        db.query('DELETE FROM User WHERE UserId = ?', [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results.affectedRows > 0);
        });
    }
};

module.exports = User;
