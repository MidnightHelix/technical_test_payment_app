const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet');
const { authenticateToken } = require('../middleware/auth');

router.post('/', walletController.createWallet);

router.get('/', authenticateToken, walletController.getWalletByUserId);


module.exports = router;
