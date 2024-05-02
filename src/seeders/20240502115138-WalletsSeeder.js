'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Wallets', [
      {
        userId: 1,
        balance: 100000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        balance: 50000,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        userId: 3,
        balance: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Wallets', null, {});
  }
};
