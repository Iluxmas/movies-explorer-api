const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');
const Error400 = require('../errors/error400');
const Error401 = require('../errors/error401');
const Error404 = require('../errors/error404');
const Error409 = require('../errors/error409');
const { USER, VALIDATION } = require('../utils/ErrorMessages');
const { StatusCodes } = require('../utils/StatusCodes');

function createUser(req, res, next) {
  const {
    password, email, name,
  } = req.body;
  bcrypt.hash(password, 12)
    .then((hash) => User.create({ email, password: hash, name }))
    .then(() => {
      res.send({
        data: { email, name },
      });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') next(new Error400(VALIDATION.INCORRECT_DATA));
      else if (error.code === 11000) next(new Error409(VALIDATION.EMAIL_EXISTS));
      else next(error);
    });
}

function getMyInfo(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) return next(new Error404('Пользователь не найден'));
      return res.status(StatusCodes.OK).send(user);
    })
    .catch(next);
}

function updateUser(req, res, next) {
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, req.body, { runValidators: true, new: true })
    .then((user) => {
      if (!user) return next(new Error404(USER.INCORRECT_ID));
      return res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') next(new Error400(VALIDATION.INCORRECT_DATA));
      else if (error.code === 11000) next(new Error409(VALIDATION.EMAIL_EXISTS));
      else next(error);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  User.findOne({ email }, '+password')
    .then((user) => {
      if (!user) return next(new Error401(USER.AUTH_WRONG));

      return bcrypt.compare(password, user.password)
        .then((data) => {
          if (data) {
            const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
            return res.status(StatusCodes.OK).send({ token });
          }
          return next(new Error401(USER.AUTH_WRONG));
        });
    })
    .catch(next);
}

module.exports = {
  createUser,
  getMyInfo,
  updateUser,
  login,
};
