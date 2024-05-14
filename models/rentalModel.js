const mongoose = require("mongoose");

const rentalSchema = mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: [true, "Por favor añade el ID de la película"], // Referencia a la película rentada
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Por favor añade el ID del usuario"], // Referencia al usuario que renta la película
    },
    rentalDate: {
      type: Date,
      required: [true, "Por favor añade la fecha de renta"], // Fecha de la renta, por defecto al crear la entrada
      default: Date.now,
    },
    returnDate: {
      type: Date,
      required: [true, "Por favor añade la fecha de devolución"], // Fecha cuando debe ser devuelta la película
    },
    status: {
      type: String,
      required: [true, "Por favor selecciona el estado de la renta"], // Estado de la renta
      enum: ["rented", "returned"],
      default: "rented",
    },
  },
  {
    timestamps: true, //marcas de tiempo para la creación y actualización del registro
  }
);

module.exports = mongoose.model("Rental", rentalSchema);
