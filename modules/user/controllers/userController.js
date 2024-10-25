const userService = require('../services/userService.js');
const userAuthService = require('../services/userAuthService.js');

async function signIn(req, res) {
  try {
    const username = await userService.signIn(
      req.body.username,
      req.body.password
    );

    const token = userAuthService.signToken(username);
    res.status(200).json({
      username,
      token,
      message: 'Logged in successfully',
    });
  } catch (error) {
    if (error.message === 'Invalid Credentials') {
      return res.status(401).json({
        message: 'Invalid credentials. Please try again.',
      });
    }

    return res.status(500).json({
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
}

async function signUp(req, res) {
  try {
    const username = await userService.signUp(
      req.body.username,
      req.body.password
    );
    res.status(201).json({
      username,
      message: 'User created successfully',
    });
  } catch (error) {
    if (error.message === 'User already exists') {
      return res.status(409).json({
        message: 'User already exists. Please choose a different username.',
      });
    }

    return res.status(500).json({
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
}

async function signOut(req, res) {
  res.status(200).json({
    message: 'Logged out successfully',
  });
}

module.exports = {
  signIn,
  signUp,
  signOut,
};
