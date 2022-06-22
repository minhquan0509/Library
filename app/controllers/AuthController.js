const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class AuthController {
    async register(req, res) {
        try{
            const user = await User.findByPk(req.body.email);
            if(user){
                return res.send('user already existed');
            } else{

                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(req.body.password, salt);
                const newUser = await User.create({
                    email: req.body.email,
                    password: hashed
                })
                res.send('created a new user!');
            }

        } catch(err){
            console.log(err);
        }
    }

    //private method
    static #generateAccessToken(user) {
        return jwt.sign({
            email: user.email,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn: '3h'});
    }

    async login(req, res) {
        try {
            const user = await User.findByPk(req.body.email);
            console.log(user);
            if(!user) return res.send('Wrong username!');
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            if(!isValidPassword) return res.send('Wrong password!');
            if(isValidPassword && user) {
                const token = AuthController.#generateAccessToken(user);
                // console.log(token);
                res.cookie('token', token,{
                    httpOnly: true,
                    secure: false,
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*60*60*1000) //3 hours
                })
                res.redirect('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    logout(req, res){
        res.clearCookie('token');
        res.redirect('login');
    }

}

module.exports = new AuthController;