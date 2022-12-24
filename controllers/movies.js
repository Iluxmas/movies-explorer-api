const Movie = require('../models/movie');
const { StatusCodes } = require('../utils/StatusCodes');
const Error400 = require('../errors/error400');
const Error403 = require('../errors/error403');
const Error404 = require('../errors/error404');

function createMovie(req, res, next) {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') next(new Error400('Переданы некорректные данные'));
      else next(error);
    });
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) return next(new Error404('Передан несуществующий id фильма.'));
      if (movie.owner.toString() !== req.user._id) return next(new Error403('Только владелец может удалять свои фильмы'));

      return movie.remove();
    }).then(() => res.status(StatusCodes.OK).send({ message: 'Фильм был удален' }))
    .catch(next);
}

function getMyMovies(req, res, next) {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
}

module.exports = { createMovie, deleteMovie, getMyMovies };
