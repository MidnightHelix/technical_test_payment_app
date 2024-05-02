const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user');


const Wallet = sequelize.define('Wallet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  }
});

const associate = (models) => {
  const { Wallet, User } = models;

  Wallet.belongsTo(User);
};

module.exports = { Wallet, associate };

