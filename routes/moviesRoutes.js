const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/moviesController");

router.route("/").get(protect, getMovies).post(protect, createMovie);

router.route("/:id").delete(protect, deleteMovie).put(protect, updateMovie);

module.exports = router;
