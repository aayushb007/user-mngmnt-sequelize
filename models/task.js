const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Feature = require('./feature');


const Task = sequelize.define('Task', {
  featureId:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  taskType: {
    type: DataTypes.ENUM('Task', 'Bug'),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    // type: DataTypes.ENUM('Pending', 'Inprogress', 'Testing', 'Completed'),
    type: DataTypes.STRING(100),
    allowNull: false
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

Feature.belongsTo(Task, { foreignKey: 'taskId' , as:"task" });
Task.hasOne(Feature, { foreignKey: 'taskId' , as:"task"});


Task.belongsTo(User,{ foreignKey: 'userId' , as:"user" });
User.hasMany(Task,{ foreignKey: 'userId' , as:"user" });
module.exports = Task;