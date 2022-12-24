const router = require('express').Router();
const { validateSignin, validateSignup } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');
const Error404 = require('../errors/error404');
const auth = require('../middlewares/auth');
const movieRouter = require('./movies');
const userRouter = require('./users');

router.post('/signin', validateSignin, login);
router.post('/signup', validateSignup, createUser);

router.use('/', auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => next(new Error404('Страницы по данному адресу не существует')));

module.exports = router;
