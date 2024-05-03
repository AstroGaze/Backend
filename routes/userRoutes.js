const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
    login,
    register,
    showData
} = require('../controllers/userController');

router.post('/login', login);
router.post('/register', register);
router.get('/showdata', protect, showData);  // Protegido, muestra datos del usuario autenticado

module.exports = router;