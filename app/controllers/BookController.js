const Book = require('../models/Book');
const { Sequelize, DataTypes, Model } = require('sequelize');

class BookController{
    books = async (req, res) => {
        let data = await Book.findAll();
        // console.log(data);
        res.render('book',{data: data});
    }
    render = async (req, res) => {
        let book = await Book.findByPk(req.params.bookID);
        console.log(book);
        res.render('details',{book});
    }
    create = (req, res) =>{
        res.render('createBook');
    }

    createBook = async (req, res) =>{
        const book = await Book.create({
            bookID: req.body.bookID,
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            numOfCopies: req.body.numOfCopies,
            imageLink: req.body.imageLink,
            status: req.body.status,
        });

        res.redirect('/books');
    }
}

module.exports = new BookController ;