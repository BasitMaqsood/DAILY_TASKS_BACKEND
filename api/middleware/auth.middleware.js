const jwt = require('jsonwebtoken');
const config = require('config');

module.exports.authMiddle = function (req, res, next) {
  const token = req.header('token');

  if (!token)
    return res
      .status(401)
      .send('Access Denied. You are not authorized to access this route.');

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

module.exports.bindUser = function (req, res, next) {
  const token = req.header('token');
  console.log('token: ', token);

  if (token.includes('ey')) {
    try {
      const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send('Invalid token.');
    }
  } else {
    next();
  }
};

module.exports.isVerified = function (req, res, next) {
  if (!req.user.isVerified) return res.status(403).send('Access Denied');
  next();
};

module.exports.admin = function (req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send('Access Denied');
  next();
};
