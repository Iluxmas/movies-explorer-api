const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const Error401 = require('../errors/error401');
const { USER } = require('../utils/ErrorMessages');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Error401(USER.AUTH_REQUIRED));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new Error401(USER.AUTH_REQUIRED));
  }

  req.user = payload;

  next();
};
