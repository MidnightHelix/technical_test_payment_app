const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction');
const { authenticateToken, authorize } = require('../middleware/auth');

router.post('/deposit', authenticateToken, transactionController.deposit);

router.post('/withdraw', authenticateToken, transactionController.withdraw);

router.get('/',  authenticateToken, transactionController.getAllTransactions);

module.exports = router;
