const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user');
const walletService = require('./wallet');

async function registerUser(userData) {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    // Create a new user
    const newUser = await userRepository.createUser({ ...userData, password: hashedPassword });

    // Create wallet for the new user
    await walletService.createWallet(newUser.id);

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.id, fullName: userData.fullName , role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return token and user data
    return { token, user: newUser };
  } catch (error) {
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    // Find user by email
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user.id, fullName: user.fullName, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  } catch (error) {
    throw error;
  }
}

module.exports = { registerUser, loginUser };
