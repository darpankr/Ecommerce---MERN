
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Bag = sequelize.define("Bag", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Bag;