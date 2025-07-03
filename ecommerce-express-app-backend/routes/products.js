// routes/products.js
const express = require('express');
const router = express.Router();
const productControl = require('../controllers/productController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

//Routes

//PUBLIC
router.get('/',productControl.getAllProduct);
router.get('/:id', productControl.getProductById);

//ADMIN PROTECTED
router.post('/create', authenticateToken, requireAdmin, productControl.createProduct);
router.put('/:id', authenticateToken, requireAdmin, productControl.updateProduct);
router.delete('/:id', authenticateToken, requireAdmin, productControl.deleteProduct);

module.exports = router;