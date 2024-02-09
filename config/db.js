const { Sequelize } = require('sequelize');
//define 
const sequelize = new Sequelize(process.env.DBNAME,process.env.DBUSER,process.env.DBPWD, {
  dialect: 'mysql',
});

module.exports = sequelize;