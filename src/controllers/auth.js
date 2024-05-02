const userService = require('../services/user');

async function register(req, res) {
  try {
    const { fullName, email, password } = req.body;
    const user = await userService.registerUser({ fullName, email, password });
    res.status(201).json({
      success: true,
      token: user.token,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed registering user:",
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.status(200).json({
      success: true,
      token: token,
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Invalid credentials",
    });
  }

}

module.exports = { register, login };
