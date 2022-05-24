const siteRouter = require('./site');
const bookRouter = require('./book');
const authRouter = require('./auth');
class Router{
    route(app){
        app.use('/auth', authRouter);
        app.use('/books', bookRouter)
        app.use('/', siteRouter);
    }
}

module.exports = new Router;