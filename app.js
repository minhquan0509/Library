require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const exp = require('constants');
const db = require('./config/db');
const cookieParser = require('cookie-parser');

const router = require('./routes');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static('public'));

db.authenticate()
    .then(() =>{
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', error);
    });
router.route(app);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server has started');
})