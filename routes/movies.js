const movieRouter = require('express').Router();
const { validateMovieId, validateNewMovieData } = require('../middlewares/validation');
const { createMovie, deleteMovie, getMyMovies } = require('../controllers/movies');

movieRouter.get('/', getMyMovies);
movieRouter.delete('/:movieId', validateMovieId, deleteMovie);
movieRouter.post('/', validateNewMovieData, createMovie);

module.exports = movieRouter;
