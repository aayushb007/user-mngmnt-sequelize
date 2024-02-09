const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const User = require('./user');
const FeatureUser = require('./featureUser');

const Feature = sequelize.define('Feature', {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    taskId:{
      type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    assignTo:{
      type: DataTypes.STRING,
      get(){
          return this.getDataValue('assignTo').split(';')
      },
      set(val){
          if (Array.isArray(val)) {
              this.setDataValue('assignTo', val.join(';'));
            } else {
              this.setDataValue('assignTo', '');
            }
      }
      
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });


  Feature.belongsToMany(User,{ through: FeatureUser, foreignKey: 'FeatureId'});
  User.belongsToMany(Feature,{ through: FeatureUser, foreignKey: 'UserId'});



  module.exports = Feature;