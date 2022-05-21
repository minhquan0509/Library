const Book = require('../models/Book');
const { Sequelize, DataTypes, Model } = require('sequelize');
class SiteController {
    home(req, res){
        res.render('home');
    }

    books = async (req, res) => {
        let data = await Book.findAll();
        console.log(data);
        res.render('book');
    }
}

module.exports = new SiteController;