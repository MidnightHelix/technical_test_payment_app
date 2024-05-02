const { User } = require('../models/user');

async function createUser(userData) {
  try {
    const newUser = await User.create(userData); // Call create method on User model
    return newUser;
  } catch (error) {
    throw error;
  }
}

async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw error;
  }
}

async function findUserById(userId) {
  return await User.findByPk(userId);
}

module.exports = { createUser, findUserByEmail, findUserById };
