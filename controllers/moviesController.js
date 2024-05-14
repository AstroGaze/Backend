const asyncHandler = require("express-async-handler");
const Movie = require("../models/movieModel");

// Obtener todas las películas
const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({});
  res.status(200).json(movies);
});

const getMovieById = asyncHandler(async (req, res) => {
  const movieId = req.params.id; // Obtiene el ID de los parámetros de la ruta

  const movie = await Movie.findById(movieId);

  if (!movie) {
    res.status(404); // Código de estado 404: No encontrado
    throw new Error("Película no encontrada");
  }

  res.status(200).json(movie); // Envía la película encontrada en formato JSON
});

// Crear una película
const createMovie = asyncHandler(async (req, res) => {
  const { title, description, year, poster } = req.body;
  if (!title || !description || !year || !poster) {
    res.status(400);
    throw new Error("Todos los campos son necesarios");
  }

  // Asegúrate de incluir el ID del usuario autenticado como 'createdBy'
  const movie = await Movie.create({
    title,
    description,
    year,
    poster, // Asume que 'req.user' tiene los detalles del usuario
  });

  res.status(201).json(movie);
});

// Actualizar una película
const updateMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    res.status(404);
    throw new Error("Película no encontrada");
  }

  // Solo actualizar campos especificados, sin modificar el 'createdBy'
  const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedMovie);
});

// Eliminar una película
const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    res.status(404);
    throw new Error("Película no encontrada");
  }

  await Movie.deleteOne({ _id: movie._id });
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
};
