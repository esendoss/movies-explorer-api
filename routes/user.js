const userRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  validateUser,
} = require('../middlewares/validation');

const {
  getUser,
  updateUser,
} = require('../controllers/user');

// возвращает информацию о пользователе (email и имя)
userRouter.get('/me', auth, getUser);
// обновляет информацию о пользователе (email и имя)
userRouter.patch('/me', auth, validateUser, updateUser);

module.exports = userRouter;
