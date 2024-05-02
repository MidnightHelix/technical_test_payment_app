const transactionService = require('../services/transaction');

async function deposit(req, res) {
  try {
    const { orderId, amount, timestamp } = req.body;
    const userId = req.user.userId;
    const transaction = await transactionService.depositFunds(orderId, amount, userId, timestamp);
    res.status(201).json({
      success: true,
      data: transaction,
      message: "Deposit request enqueued",
    });
  } catch (error) {
    console.error('Error depositing amount:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed depositing amount:",
    });
  }
}

async function withdraw(req, res){
  try {
    const { orderId, amount, timestamp } = req.body;
    const userId = req.user.userId;
    const withdrawal = await transactionService.initiateWithdrawal(orderId, amount, userId, timestamp);
    res.status(201).json({
      success: true,
      data: withdrawal,
      message: "Withdrawal request enqueued",
    });
  } catch (error) {
    console.error('Error initiating withdrawal:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed initiating withdrawal",
    });
  }
}

async function getAllTransactions(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { userId, role } = req.user;
    const result = await transactionService.getAllTransactions(page, limit, userId, role);
    res.json({
      success: true,
      data: result.transactions,
      currentPage: result.currentPage,
      total_transactions: result.totalTransactions,
      total_pages: result.totalPages,
      message: "Transactions retrieved successfully",
    });
  } catch (error) {
    console.error('Error getting transactions:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to retrieve transactions",
    });
  }
}

module.exports = { deposit, withdraw, getAllTransactions };
