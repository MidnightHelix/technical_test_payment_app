'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        fullName: 'John Doe',
        email: 'john_doe@gmail.com',
        password: '123456',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Jane Smith',
        email: 'jane_smith@gmail.com',
        password: '123456',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Admin',
        email: 'admin@gmail.com',
        password: '123456',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
