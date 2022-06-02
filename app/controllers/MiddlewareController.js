const jwt = require('jsonwebtoken');
const User = require('../models/User');
class MiddlewareController{
    verifyToken(req, res, next) {
        const token = req.cookies.token;
        if(token){  //already logged in

            const accessToken = token;
            jwt.verify(accessToken,process.env.JWT_SECRET_KEY, (err, user) => {
                if(err) return res.status(403).json('Token is not valid');
                req.user = user;
                // console.log(user);
                next();
            })
        }
        else{       //user not login yet
            res.json('You are not login yet');
        }
    }

    async verifyAdmin (req, res, next){
        const user = await User.findOne({ where: { email: req.user.email } });
        // console.log(user);
        if(user.isAdmin === true){
            next();
        } else{
            res.status(403).json('You are not allow to do that action');
        }
    }
}

module.exports = new MiddlewareController;