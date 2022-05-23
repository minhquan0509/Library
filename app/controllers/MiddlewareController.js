const jwt = require('jsonwebtoken');
class MiddlewareController{
    verifyToken(req, res, next){
        const token = req.cookies.token;
        if(token){  //already logged in

            const accessToken = token;
            jwt.verify(accessToken,process.env.JWT_SECRET_KEY, (err, user) => {
                if(err) return res.status(403).json('Token is not valid');
                req.user = user;
                console.log(user);
                next();
            })
        }
        else{       //user not login yet
            res.json('You are not login yet');
        }
    }
}

module.exports = new MiddlewareController;