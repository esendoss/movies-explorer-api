const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/user');
const { validateLogin, validateRegister } = require('../middlewares/validation');

const userRouter = require('./user');
const movieRouter = require('./movie');

router.post('/signup', validateRegister, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Путь не найден'));
});

module.exports = router;
