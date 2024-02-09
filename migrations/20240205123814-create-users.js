'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      name :{
        type: Sequelize.STRING(100),
        allowNull: false
    },
    email:{
        type: Sequelize.STRING(100),
        allowNull: false
    },
    password :{
        type: Sequelize.STRING(100),
        allowNull: false
    },
    addressId:{
        type: Sequelize.INTEGER,
        allowNull: false,
       
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
