const asyncHandler = require("express-async-handler");
const Rental = require("../models/rentalModel");

// Obtener todas las rentas del usuario autenticado
const getRentals = asyncHandler(async (req, res) => {
  const { status } = req.query;
  let query = { user: req.user._id };

  if (status) {
    query.status = status;
  }
  const rentals = await Rental.find(query).populate("movie");
  res.status(200).json(rentals);
});

// Get all rentals for all users
const getAllRentals = asyncHandler(async (req, res) => {
  const { status } = req.query;
  let query = {}; // Start with an empty query

  if (status) {
    query.status = status; // Filter by status if provided
  }

  const rentals = await Rental.find(query).populate("movie").populate("user");
  res.status(200).json(rentals);
});

const getRentalById = asyncHandler(async (req, res) => {
  const rental = await Rental.findById(req.params.id)
    .populate("movie")
    .populate("user", "name");

  if (!rental) {
    res.status(404).json({ message: "Rental not found" });
    return;
  }

  res.status(200).json(rental);
});

// Crear una renta
const createRental = asyncHandler(async (req, res) => {
  const { movie, returnDate } = req.body;

  if (!movie || !returnDate) {
    res.status(400).json({
      message:
        "Por favor añade todos los campos necesarios: película y fecha de devolución",
    });
    return;
  }

  const existingRental = await Rental.findOne({
    movie: movie,
    status: "rented",
  });

  if (existingRental) {
    res.status(400).json({ message: "La película ya está rentada" });
    return;
  }

  const rental = await Rental.create({
    movie,
    user: req.user._id,
    rentalDate: Date.now(),
    returnDate,
    status: "rented",
  });
  res.status(201).json(rental);
});

// Actualizar una renta
const updateRental = asyncHandler(async (req, res) => {
  const { returnDate, status } = req.body;
  const rental = await Rental.findById(req.params.id);

  if (!rental) {
    res.status(404).json({ message: "Renta no encontrada" });
    return;
  }
  if (rental.user.toString() !== req.user._id.toString()) {
    res.status(401).json({ message: "Usuario no autorizado" });
    return;
  }

  rental.returnDate = returnDate || rental.returnDate;
  rental.status = status || rental.status;
  await rental.save();
  res.status(200).json(rental);
});

// Eliminar una renta
const deleteRental = asyncHandler(async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) {
    res.status(404).json({ message: "Renta no encontrada" });
    return;
  }

  await Rental.deleteOne({ _id: rental._id });
  res.status(200).json({ message: "Renta eliminada", id: req.params.id });
});

module.exports = {
  getRentals,
  createRental,
  updateRental,
  deleteRental,
  getAllRentals,
  getRentalById,
};
