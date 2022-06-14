const Book = require('../models/Book');
const { Sequelize, DataTypes, Model } = require('sequelize');
const Op = Sequelize.Op;

class BookController{
    books = async (req, res) => {
        try {
            
            let data = await Book.findAll();
            res.render('book',{data: data});
        } catch (error) {
            res.send(error);
        }
    }
    render = async (req, res) => {
        try {
            let book = await Book.findByPk(req.params.bookID);
            res.render('details',{book});
        } catch (error) {
            res.send(error);
        }
    }
    create = (req, res) =>{
        res.render('createBook');
    }

    createBook = async (req, res) =>{
        try {     
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
        } catch (error) {
            res.send(error);
        }
    }

    searchBook = async (req, res) => {
        try {         
            const title = req.query.title;
            const data = await Book.findAll({
                where:{
                    title: {
                        [Op.like]: `%${title}%`
                    }
                }
            })
            res.status(200).render('book',{data});
        } catch (error) {
            res.send(error);
        }
    }

}

module.exports = new BookController ;