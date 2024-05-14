const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  login,
  register,
  showData,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/login", login);
router.post("/register", register);
router.get("/showdata", protect, showData);
router.get("/getUsuarios", getUsers); // Protegido, muestra datos del usuario autenticado
router.get("/getUsuario/:id", getUserById);
router.delete("/deleteUser/:id", deleteUser);
router.put("/updateUsuario/:id", updateUser);
module.exports = router;
