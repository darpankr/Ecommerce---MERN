const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: {
            name: 'unique_email_constraint', // 👈 Explicit name avoids repeated indexes
            msg: 'Email address already in use!'
        },
        allowNull: false
    },
    password: DataTypes.STRING,
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    }
});

module.exports = User;
