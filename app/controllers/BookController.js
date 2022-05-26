const Book = require('../models/Book');
const { Sequelize, DataTypes, Model } = require('sequelize');

class BookController{
    books = async (req, res) => {
        let data = await Book.findAll();
        console.log(data);
        res.render('book',{data: data});
    }
    render = async (req, res) => {
        let book = await Book.findByPk(req.params.bookID);
        console.log(book);
        res.render('details',{book});
    }
    create = (req, res) =>{
        res.send('ok');
    }
}

module.exports = new BookController ;