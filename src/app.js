require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/user');
const transactionRoutes = require('./routes/transaction');
const walletRoutes = require('./routes/wallet');
const { sequelize, testConnection } = require('./config/database');
const { startConsumer } = require('./infrastructure/kafkaConsumer');


// Enable all CORS requests
app.use(cors());

testConnection();
startConsumer();

app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);
app.use('/wallets', walletRoutes);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
