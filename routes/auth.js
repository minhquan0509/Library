const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');

router.get('/login', (req, res) => {
    res.render('login');
})
router.get('/register', (req, res) => {
    res.render('register');
})

module.exports = router;