require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function signToken(username) {
  const payload = { username };
  const options = { expiresIn: '3d' };
  return jwt.sign(payload, JWT_SECRET, options);
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data.username);
      }
    });
  });
}

module.exports = {
  signToken,
  verifyToken,
};
