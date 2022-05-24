const Book = require('../models/Book');
const { Sequelize, DataTypes, Model } = require('sequelize');
class SiteController {
    home(req, res){
        res.render('home');
    }

    about(req, res){
        res.render('about');
    }

    borrow(req, res){
        res.render('borrow');
    }
}

module.exports = new SiteController;