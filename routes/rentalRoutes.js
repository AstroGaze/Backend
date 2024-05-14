const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getRentals,
  createRental,
  updateRental,
  deleteRental,
  getAllRentals,
  getRentalById,
} = require("../controllers/rentalController");

router.route("/").get(protect, getRentals).post(protect, createRental);
router.route("/allRentals").get(getAllRentals);
router
  .route("/:id")
  .put(protect, updateRental)
  .delete(protect, deleteRental)
  .get(protect, getRentalById);

module.exports = router;
