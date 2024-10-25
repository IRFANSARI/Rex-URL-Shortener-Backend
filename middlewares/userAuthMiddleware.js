const userAuthService = require('../modules/user/services/userAuthService.js');

module.exports = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    req.username = null;
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    req.username = await userAuthService.verifyToken(token);
  } catch (error) {
    req.username = null;
  }

  next();
};
