const express = require('express');
const router = express.Router();
const authControl = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, authControl.getProfile);
router.put('/update', authenticateToken, authControl.updateProfile);

module.exports = router;