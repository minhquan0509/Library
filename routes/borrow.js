const express = require('express');
const router = express.Router();
const borrowController = require('../app/controllers/BorrowController');
const authController = require('../app/controllers/AuthController');
const middlewareController = require('../app/controllers/MiddlewareController');

// router.get('/create', middlewareController.verifyToken, middlewareController.verifyAdmin, borrowController.create);
router.post('/create', middlewareController.verifyToken, middlewareController.verifyAdmin, borrowController.create);
router.post('/edit', middlewareController.verifyToken, middlewareController.verifyAdmin, borrowController.edit);
router.delete('/:loanID', middlewareController.verifyToken, middlewareController.verifyAdmin, borrowController.delete);
router.get('/', middlewareController.verifyToken, middlewareController.verifyAdmin, borrowController.borrow);

module.exports = router;
