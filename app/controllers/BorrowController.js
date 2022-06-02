const Book = require('../models/Book');
const Loan = require('../models/Loan');
const { Sequelize, DataTypes, Model } = require('sequelize');

class BorrowController {
    borrow = async (req, res) => {
        const loans = await Loan.findAll();
        res.render('borrow',{loans});
    }

    create = async (req, res) => {
        // const loan = {
        //     email: req.body.email,
        //     bookID: req.body.bookID,
        //     borrowDate: req.body.issueDate,
        //     dueDate: req.body.dueDate,
        //     returnDate: req.body.returnDate,
        // }
        // console.log(loan);
        const loan = await Loan.create({
            userEmail: req.body.email,
            bookID: req.body.bookID,
            issueDate: req.body.issueDate,
            dueDate: req.body.dueDate,
            // returnDate: req.body.returnDate,

        })
        res.redirect('/borrow');
    }
}

module.exports = new BorrowController;