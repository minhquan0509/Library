const Book = require('../models/Book');
const Loan = require('../models/Loan');
const User = require('../models/User');
const { Sequelize, DataTypes, Model, QueryTypes} = require('sequelize');
const {sequelize} = require('../config/db/index');

class BorrowController {
    borrow = async (req, res) => {
        try{
            console.log(req.user.isAdmin);
            
            const isAdmin = req.user.isAdmin;
            if(isAdmin){

                const loans = await Loan.findAll();
                const users = await User.findAll();
                const books = await Book.findAll();
                return res.render('borrow',{loans, isAdmin, users, books});
            }
            else{
                const loans = await Loan.findAll({
                    where:{
                        userEmail: req.user.email
                    }
                });
                return res.render('borrow',{loans, isAdmin: false, users : [], books : []});
            }
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
            const numOfCopies = await Book.findAll({
                attributes: ['numOfCopies'],
                where: {
                    bookID: req.body.bookID
                }
            })
            const quantity = numOfCopies[0].dataValues.numOfCopies
            if(quantity < 1){ return res.json('Out of stocked!')}
            else{
                const loan = await Loan.create({
                    userEmail: req.body.email,
                    bookID: req.body.bookID,
                    issueDate: req.body.issueDate,
                    dueDate: req.body.dueDate,
                    // returnDate: req.body.returnDate,
                    status: 'progressing'
                })
                res.redirect('/borrow');
            }
        } catch (error) {
            res.send(error);
        }
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
            const loan = await sequelize.query(`UPDATE loans set issueDate = '${req.body.issueDate}', dueDate = '${req.body.dueDate}', returnDate = '${req.body.returnDate}', status = '${req.body.status}' where ID = ${req.body.ID}`, { type: QueryTypes.UPDATE });
            if(req.body.status === 'done')
            await sequelize.query(`UPDATE books set numOfCopies = numOfCopies + 1 where bookID = ${req.body.bookID}`);
            res.status(200);
        } catch (error) {
            res.send(error);
        }
    }

    delete = async (req, res) => {
        try {
            const book = await Loan.findAll({
                attributes: ['bookID'],
                where:{
                    ID: req.params.loanID
                }
            })
            const bookID = book[0].dataValues.bookID;
            console.log(bookID);
            await sequelize.query(`UPDATE books set numOfCopies = numOfCopies + 1 where bookID = ${bookID}`);
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