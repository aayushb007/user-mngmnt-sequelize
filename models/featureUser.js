const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FeatureUser = sequelize.define('FeatureUser', {
  selfGranted: {
    type: DataTypes.BOOLEAN,
    
  }
}, { timestamps: false });

module.exports = FeatureUser;
