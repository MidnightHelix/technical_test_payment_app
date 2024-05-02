const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Wallet = require('./wallet');
const Transaction = require('./transaction');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user' // Default role is 'user'
  }
});

const associate = (models) => {
  const { User, Wallet, Transaction } = models;

  User.hasMany(Transaction);
  User.hasOne(Wallet, { onDelete: 'cascade' });
};

module.exports = { User, associate };
