const { Sequelize } = require('sequelize');

// Initialize Sequelize with connection parameters
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'midnight',
  password: 'midnight',
  database: 'payment_app', // Change to your desired database name
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Export the sequelize instance
module.exports = { sequelize, testConnection };
