const Book = require('../models/Book');
const Loan = require('../models/Loan');
const { Sequelize, DataTypes, Model, QueryTypes} = require('sequelize');
const {sequelize} = require('../config/db/index');

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

    edit = async (req, res) => {
        // const loan = await Loan.create({
        //     userEmail: req.body.email,
        //     bookID: req.body.bookID,
        //     issueDate: req.body.issueDate,
        //     dueDate: req.body.dueDate,
        //     // returnDate: req.body.returnDate,

        // })
        // res.redirect('/borrow');
        console.log(req.body);
        const loan = await sequelize.query(`UPDATE loans set ` + req.body.fieldName + ` = '` + req.body.value + `' where ID = ` + req.body.ID, { type: QueryTypes.UPDATE });
    }
}

module.exports = new BorrowController;