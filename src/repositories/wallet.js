const { Wallet } = require('../models/wallet');

async function createWallet(userId) {
  try {
    const wallet = await Wallet.create({ userId });
    return wallet;
  } catch (error) {
    console.error('Error creating wallet:', error);
    throw error;
  }
}

async function getWalletByUserId(userId) {
  try {
    const wallet = await Wallet.findOne({ where: { userId } });
    return wallet;
  } catch (error) {
    console.error('Error fetching wallet:', error);
    throw error;
  }
}

async function updateWalletBalance(userId, amount) {
  const wallet = await getWalletByUserId(userId);
  if (!wallet) {
    throw new Error('Wallet not found');
  }
  await wallet.increment('balance', { by: amount });
}

module.exports = { createWallet, getWalletByUserId, updateWalletBalance };
