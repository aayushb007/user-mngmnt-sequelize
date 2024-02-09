const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const User = require('./user');
const Address = sequelize.define('Address',{
    city :{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    state:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    country :{
        type: DataTypes.STRING(100),
        allowNull: false
    }
});





module.exports = Address;
