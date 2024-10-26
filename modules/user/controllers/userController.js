const userService = require('../services/userService.js');
const userAuthService = require('../services/userAuthService.js');

async function signIn(req, res) {
  try {
    if (req.username) {
      return res.status(200).json({
        message: 'You are already logged in',
      });
    }

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
    const message = error.message;
    if (message === 'Invalid Credentials') {
      return res.status(401).json({ message });
    }

    return res.status(500).json({ message });
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
    const message = error.message;
    if (message === 'User already exists') {
      return res.status(409).json({ message });
    }

    return res.status(500).json({ message });
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
