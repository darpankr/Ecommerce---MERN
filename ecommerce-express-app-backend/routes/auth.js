
const express = require('express');
const router = express.Router();
const authControl = require('../controllers/authController');

//Routes
router.post('/register', authControl.register);
router.post('/login', authControl.login);
router.get('/logins', (req, res) => res.json({ status: 'get login test route works!' }));

router.get('/', authControl.getAllUsers)
router.get('/:id', authControl.deleteUser)




module.exports = router