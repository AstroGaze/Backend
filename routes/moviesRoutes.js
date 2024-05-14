const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
} = require("../controllers/moviesController");

router.route("/").get(getMovies).post(createMovie);

router.route("/:id").delete(deleteMovie).put(protect, updateMovie);

router.get("/getMovie/:id", getMovieById);

module.exports = router;
