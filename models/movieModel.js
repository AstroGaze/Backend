const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Por favor añade un título a la película"],
    },
    description: {
      type: String,
      required: [true, "Por favor añade una descripción a la película"],
    },
    year: {
      type: String,
      required: [true, "Por favor añade el año de lanzamiento de la película"],
    },
    rating: {
      type: Number,
      required: [true, "Por favor añade una calificación a la película"],
      min: 0,
      max: 10,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Mantiene registro de cuándo se creó o actualizó la película
  }
);

module.exports = mongoose.model("Movie", movieSchema);
