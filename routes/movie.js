const movieRouter = require('express').Router();

const auth = require('../middlewares/auth');
const {
  validateUserId,
  validateMovie,
} = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

movieRouter.get('/', auth, getMovies);
movieRouter.post('/', auth, validateMovie, createMovie);
movieRouter.delete('/:_id', auth, validateUserId('_id'), deleteMovie);

module.exports = movieRouter;
