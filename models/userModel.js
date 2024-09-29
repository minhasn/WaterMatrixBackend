// userModel.js
const db = require('../config/db');

const User = {
    getAllUsers: (callback) => {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    
    getUserById: (userId, callback) => {
        db.query('SELECT * FROM users WHERE UserId = ?', [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    createUser: (userData, callback) => {
        db.query('INSERT INTO users SET ?', userData, (err, results) => {
            if (err) return callback(err);
            callback(null, { UserId: results.insertId, ...userData });
        });
    },

    updateUser: (userId, userData, callback) => {
        db.query('UPDATE users SET ? WHERE UserId = ?', [userData, userId], (err, results) => {
            if (err) return callback(err);
            callback(null, { UserId: userId, ...userData });
        });
    },

    deleteUser: (userId, callback) => {
        db.query('DELETE FROM users WHERE UserId = ?', [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results.affectedRows > 0);
        });
    }
};

module.exports = User;
