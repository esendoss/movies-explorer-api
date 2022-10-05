const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const UncorrectError = require('../errors/UncorrectError');
const DeleteMovieError = require('../errors/DeleteMovieError');

//  возвращает все сохранённые текущим  пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch((err) => next(err));
};

// создаёт фильм
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new UncorrectError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

//  удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError('Фильм не найден');
    })
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new DeleteMovieError('Отсутствуют права на удаление'));
      }
      return movie.remove()
        .then(() => res.status(200).send({ movie, message: 'Фильм удален' }));
    })
    .catch(next);
};
