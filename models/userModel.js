const db = require('../config/db'); // Assuming this is your DB connection setup

const User = {
    getAllUsers: (callback) => {
        const query = 'SELECT * FROM users';
        db.query(query, (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    getUserById: (id, callback) => {
        const query = 'SELECT * FROM users WHERE UserId = ?';
        db.query(query, [id], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result[0]);
        });
    },

    createUser: (userData, callback) => {
        const query = 'INSERT INTO users SET ?';
        db.query(query, userData, (err, result) => {
            if (err) return callback(err, null);
            callback(null, { id: result.insertId, ...userData });
        });
    },

    updateUser: (id, userData, callback) => {
        const query = 'UPDATE users SET ? WHERE UserId = ?';
        db.query(query, [userData, id], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },

    deleteUser: (id, callback) => {
        const query = 'DELETE FROM users WHERE UserId = ?';
        db.query(query, [id], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result.affectedRows > 0);
        });
    },
};

module.exports = User;
