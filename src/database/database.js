const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(/* sequelize options */);

const UserModel = require('../models/user');
const WalletModel = require('../models/wallet');
const TransactionModel = require('../models/transaction');

UserModel.associate({ Wallet: WalletModel,transaction: TransactionModel });
WalletModel.associate({ User: UserModel });
TransactionModel.associate({ User: UserModel })

module.exports = {
    sequelize,
    User: UserModel,
    Wallet: WalletModel,
    transaction: TransactionModel,
};
