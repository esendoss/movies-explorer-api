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

movieRouter.get('/movies', auth, getMovies);
movieRouter.post('/movies', auth, validateMovie, createMovie);
movieRouter.delete('/movies/:_id', auth, validateUserId('_id'), deleteMovie);

module.exports = movieRouter;
