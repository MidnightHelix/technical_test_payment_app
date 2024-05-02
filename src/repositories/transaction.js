const { Transaction } = require('../models/transaction');

async function createDepositTransaction(orderId, amount, userId, timestamp) {
  try {
    const depositTransaction = await Transaction.create({
      orderId,
      amount,
      status: 0, // Assuming initial status is success
      type: 'deposit',
      userId: userId,
      createdAt: timestamp
    });
    return depositTransaction;
  } catch (error) {
    throw error;
  }
}

async function createWithdrawalTransaction(orderId, amount, userId, timestamp) {
  try {
    const withdrawal = await Transaction.create({
      orderId,
      amount,
      status: 0, // Assuming initial status is pending
      type: 'withdrawal',
      userId,
      createdAt: timestamp
    });
    return withdrawal;
  } catch (error) {
    throw error;
  }
}

async function updateTransactionStatus(orderId, status) {
  try {
    const transaction = await Transaction.findOne({ where: { orderId } });
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    transaction.status = status;
    await transaction.save();
    return transaction;
  } catch (error) {
    throw error;
  }
}

async function getAllTransactions(page, limit, userId, role) {
  try {
    const offset = (page - 1) * limit;
    let whereClause = {};

    if (role === 'admin') {
      // If the user is an admin, they can see all transactions
      whereClause = {};
    } else {
      // If the user is not an admin, they can only see their own transactions
      whereClause = { userId };
    }

    const transactions = await Transaction.findAndCountAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [['createdAt', 'DESC']]
    });

    return transactions;
  } catch (error) {
    throw error;
  }
}

module.exports = { createDepositTransaction, createWithdrawalTransaction, updateTransactionStatus, getAllTransactions };
