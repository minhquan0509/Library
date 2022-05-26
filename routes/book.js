const express = require('express');
const router = express.Router();
const bookController = require('../app/controllers/BookController');
const middlewareController = require('../app/controllers/MiddlewareController');

router.get('/create', middlewareController.verifyToken ,middlewareController.verifyAdmin ,bookController.create);
router.get('/:bookID', bookController.render);
router.get('/', bookController.books);

module.exports = router;