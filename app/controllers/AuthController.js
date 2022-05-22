const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class AuthController {
    async register(req, res) {
        console.log(req.body.email, req.body.password);
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
    async login(req, res) {
        try {
            const user = await User.findByPk(req.body.email);
            if(!user) return res.send('Wrong username!');
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            if(!isValidPassword) return res.send('Wrong password!');
            if(isValidPassword && user) {
                return res.redirect('home'); // need to add JWT verify
            }
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new AuthController;