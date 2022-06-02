const siteRouter = require('./site');
const bookRouter = require('./book');
const authRouter = require('./auth');
const borrowRouter = require('./borrow');
class Router{
    route(app){
        app.use('/auth', authRouter);
        app.use('/books', bookRouter);
        app.use('/borrow', borrowRouter);
        app.use('/', siteRouter);
    }
}

module.exports = new Router;