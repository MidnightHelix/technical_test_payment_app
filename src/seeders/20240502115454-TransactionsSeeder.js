'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Transactions', [
        {
          orderId: '1',
          amount: 100,
          status: 0,
          type: 'deposit',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          orderId: '2',
          amount: 50,
          status: 0,
          type: 'deposit',
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          orderId: '3',
          amount: 20,
          status: 0,
          type: 'withdrawal',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Transactions', null, {});
    }
};
