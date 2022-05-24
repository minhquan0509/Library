const express = require('express');
const router = express.Router();
const bookController = require('../app/controllers/BookController');

router.get('/:bookID', bookController.render);
router.get('/', bookController.books);

module.exports = router;