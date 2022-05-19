const siteRouter = require('./site');
class Router{
    route(app){
        app.use('/', siteRouter);
    }
}

module.exports = new Router;