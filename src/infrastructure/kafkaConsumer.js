const { Kafka } = require('kafkajs');
const walletService = require('../services/wallet');
const transactionService = require('../services/transaction');

const kafka = new Kafka({
  clientId: 'wallet-service',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'wallet-consumer-group' });

async function startConsumer() {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'wallet-updates', fromBeginning: false });
    await consumer.subscribe({ topic: 'transaction-status-updates', fromBeginning: false });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          if (topic === 'wallet-updates') {
            const { userId, amount } = JSON.parse(message.value);
            await walletService.updateWalletBalance(userId, amount);
            console.log(`Wallet updated for user ${userId}`);
          } else if (topic === 'transaction-status-updates') {
            const { orderId, status } = JSON.parse(message.value);
            await transactionService.updateTransactionStatus(orderId, status);
            console.log(`Transaction status updated for transaction ${orderId}`);
          }
        } catch (error) {
          console.error('Error processing message:', error);
          if (topic === 'wallet-updates') {
            await transactionService.updateTransactionStatus(orderId, 2);
            console.log(`Transaction status updated to failed for transaction ${orderId}`);
          }
        }
      }
    });
  } catch (error) {
    console.error('Error starting consumer:', error);
  }
}

module.exports = { startConsumer };
