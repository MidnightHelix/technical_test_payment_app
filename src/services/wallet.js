const walletRepository = require('../repositories/wallet');
const userRepository = require('../repositories/user');

async function createWallet(userId) {
  try {
    const wallet = await walletRepository.createWallet(userId);
    return wallet;
  } catch (error) {
    console.error('Error creating wallet:', error);
    throw error;
  }
}

async function getWalletByUserId(userId) {
  try {
    const wallet = await walletRepository.getWalletByUserId(userId);
    return wallet;
  } catch (error) {
    console.error('Error fetching wallet:', error);
    throw error;
  }
}

async function updateWalletBalance(userId, amount) {
  await walletRepository.updateWalletBalance(userId, amount);
}

module.exports = { createWallet, getWalletByUserId, updateWalletBalance };
