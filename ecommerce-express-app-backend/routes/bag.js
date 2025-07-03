
const express = require('express');
const router = express.Router();
const bagControl = require('../controllers/bagControler');
const { authenticateToken, requireAdmin }  = require('../middleware/authMiddleware');

router.post('/move', authenticateToken, bagControl.moveToBag);
router.get('/', authenticateToken, bagControl.getBag);
router.delete('/delete/:id', authenticateToken, bagControl.deleteBagItem);
router.put('/update/:id', authenticateToken, bagControl.updateBagQuantity);


module.exports = router;