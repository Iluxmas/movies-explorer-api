const userRouter = require('express').Router();
const { validateUserInfo } = require('../middlewares/validation');
const { updateUser, getMyInfo } = require('../controllers/users');

userRouter.get('/me', getMyInfo);
userRouter.patch('/me', validateUserInfo, updateUser);

module.exports = userRouter;
