const siteRouter = require('./site');
const authRouter = require('./auth');
class Router{
    route(app){
        app.use('/auth', authRouter);
        app.use('/', siteRouter);
    }
}

module.exports = new Router;