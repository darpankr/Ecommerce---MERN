// routes/cart.js
const express = require('express');
const router = express.Router();
const cartControl = require('../controllers/cartController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');



router.put('/:id', authenticateToken, cartControl.updateCart);
router.post('/add', authenticateToken, cartControl.addToCart);
router.delete('/:id', authenticateToken, cartControl.removeFromCart);
router.get('/', authenticateToken, cartControl.getCart);
router.get('/:id', authenticateToken, cartControl.getCartById);

module.exports = router;