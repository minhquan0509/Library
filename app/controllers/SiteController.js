const Book = require('../models/Book');
const Loan = require('../models/Loan');
const { Sequelize, DataTypes, Model } = require('sequelize');
class SiteController {
    home(req, res){
        res.render('home');
    }

    about(req, res){
        res.render('about');
    }
}

module.exports = new SiteController;