const bcrypt = require('bcrypt');
const userModel = require('../models/userModel.js');

async function signIn(username, password) {
  const user = await userModel.findOne({ username });

  if (!user) {
    throw new Error('Invalid Credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid Credentials');
  }

  return user.username;
}

async function signUp(username, password) {
  const user = await userModel.findOne({ username });

  if (user) {
    throw new Error('User already exists');
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await userModel.create({
    username,
    password: hashedPassword,
  });

  return newUser.username;
}

module.exports = {
  signIn,
  signUp,
};
