const Book = require('../models/Book');
const Loan = require('../models/Loan');
const { Sequelize, DataTypes, Model, QueryTypes} = require('sequelize');
const {sequelize} = require('../config/db/index');

class BorrowController {
    borrow = async (req, res) => {
        try{
            console.log(req.user.isAdmin);
            const isAdmin = req.user.isAdmin;
            const loans = await Loan.findAll();
            return res.render('borrow',{loans, isAdmin});
        } catch(err){
            res.send(err);
        }
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
        try {
            
            const loan = await Loan.create({
                userEmail: req.body.email,
                bookID: req.body.bookID,
                issueDate: req.body.issueDate,
                dueDate: req.body.dueDate,
                // returnDate: req.body.returnDate,
            })
        } catch (error) {
            res.send(error);
        }
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
        try {
            console.log(req.body);
            const loan = await sequelize.query(`UPDATE loans set userEmail = '` + req.body.userEmail + `', issueDate = '`+ req.body.issueDate +`', dueDate = '`+ req.body.dueDate +`', returnDate = '`+ req.body.returnDate +`', status = '`+ req.body.status +`' where ID = ` + req.body.ID, { type: QueryTypes.UPDATE });
            res.status(200);
        } catch (error) {
            res.send(error);
        }
    }

    delete = async (req, res) => {
        try {
            await Loan.destroy({
                where:{
                    ID: req.params.loanID
                }
            });
        } catch (error) {
            res.send(error);
        }
        res.redirect('/borrow');
    }
}

module.exports = new BorrowController;