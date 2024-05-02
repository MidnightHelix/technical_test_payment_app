const kafkaProducer = require('../infrastructure/kafkaProducer');
const userRepository = require('../repositories/user');
const transactionRepository = require('../repositories/transaction');
const walletService = require('./wallet');

async function depositFunds(orderId, amount, userId, timestamp) {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const message = { orderId, amount, userId, timestamp: Date.now() };
  await kafkaProducer.sendMessage('deposit-requests', message);

  // Create deposit transaction
  const transaction = await transactionRepository.createDepositTransaction(orderId, amount, userId, timestamp);

  // Trigger wallet update
  await enqueueWalletUpdate(userId, amount);

  // Trigger transaction status update
  await enqueueTransactionStatusUpdate(orderId, 1);

  return transaction;
}

async function enqueueWalletUpdate(userId, amount) {
  const message = { userId, amount };
  await kafkaProducer.sendMessage('wallet-updates', message);
}

async function enqueueTransactionStatusUpdate(orderId, status) {
  const message = { orderId, status };
  await kafkaProducer.sendMessage('transaction-status-updates', message);
}

async function initiateWithdrawal(orderId, amount, userId, timestamp) {
    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the withdrawal amount exceeds the balance in the wallet
    const wallet = await walletService.getWalletByUserId(userId);
    if (wallet.balance < amount) {
      throw new Error('Insufficient balance for withdrawal');
    }

    const message = { orderId, amount, userId, timestamp: Date.now() };
    await kafkaProducer.sendMessage('withdrawal-requests', message);

    // Create a new withdrawal transaction
    const withdrawal = await transactionRepository.createWithdrawalTransaction(orderId, -amount, userId, timestamp);

    // Trigger wallet update
    await enqueueWalletUpdate(userId, -amount);

    // Trigger transaction status update
    await enqueueTransactionStatusUpdate(orderId, 1);

    return withdrawal;
}

async function updateTransactionStatus(orderId, status) {
  try {
    const updatedTransaction = await transactionRepository.updateTransactionStatus(orderId, status);
    return updatedTransaction;
  } catch (error) {
    throw error;
  }
}

async function getAllTransactions(page, limit, userId, role) {
  try {
    const transactions = await transactionRepository.getAllTransactions(page, limit, userId, role);
    const { rows, count } = transactions;

    const totalPages = Math.ceil(count / limit);

    return {
      transactions: rows,
      currentPage: parseInt(page),
      totalTransactions: count,
      totalPages: totalPages
    };
  } catch (error) {
    throw error;
  }
}

module.exports = { enqueueWalletUpdate, enqueueTransactionStatusUpdate, depositFunds, initiateWithdrawal, updateTransactionStatus, getAllTransactions };