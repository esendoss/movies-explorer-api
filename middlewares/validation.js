const { celebrate, Joi } = require('celebrate');

const validation = (value, helpers) => {
  const linkRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

  if (!linkRegExp.test(value)) {
    return helpers.error('Ссылка не валидна');
  }
  return value;
};
// валидация входа
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
// валидация регистрации
const validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
// валидация создания фильма
const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().max(4),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validation),
    trailerLink: Joi.string().required().custom(validation),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom(validation),
    movieId: Joi.number().required(),
  }),
});

const validateUserId = (nameId) => celebrate({
  params: Joi.object().keys({
    [nameId]: Joi.string().hex().required().length(24),
  }),
});
// валидация пользователя
const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  validateLogin,
  validateRegister,
  validateUserId,
  validateUser,
  validateMovie,
};
