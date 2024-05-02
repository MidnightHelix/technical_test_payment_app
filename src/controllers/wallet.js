const walletService = require('../services/wallet');

async function createWallet(req, res) {
  try {
    const userId = req.body.userId;
    const wallet = await walletService.createWallet(userId);
    res.json(wallet);
  } catch (error) {
    console.error('Error creating wallet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getWalletByUserId(req, res) {
  try {
    const userId = req.user.userId;
    const wallet = await walletService.getWalletByUserId(userId);
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }
    res.json({
      success: true,
      data: wallet,
    });
  } catch (error) {
    console.error('Error fetching wallet:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed fetching wallet:",
    });
  }
}

module.exports = { createWallet, getWalletByUserId };
