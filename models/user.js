const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const Address = require('./address');
const User = sequelize.define('User',{
    name :{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password :{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    addressId:{
        type: DataTypes.INTEGER,
        allowNull: false,
       
      },
},
{
    indexes:[
     {
       unique: false,
       fields:['email']
     }
    ]
  });
User.belongsTo(Address,{foreignKey: 'addressId', as :'address'
    });

Address.hasOne(User,{ foreignKey: 'addressId' , as:"address"});




module.exports = User;
