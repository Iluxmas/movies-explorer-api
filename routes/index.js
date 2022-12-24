const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const Error404 = require('../errors/error404');
const { login, createUser } = require('../controllers/users');
const { validateSignin, validateSignup } = require('../middlewares/validation');

router.post('/signin', validateSignin, login);
router.post('/signup', validateSignup, createUser);

router.use('/', auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => next(new Error404('Страницы по данному адресу не существует')));

module.exports = router;
