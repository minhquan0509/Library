const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');
const authController = require('../app/controllers/AuthController');
const middlewareController = require('../app/controllers/MiddlewareController');

router.get('/borrow', middlewareController.verifyToken, siteController.borrow);
router.use('/about', siteController.about);
router.use('/', siteController.home);

module.exports = router;