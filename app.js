require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const exp = require('constants');
const db = require('./app/config/db/index');
const cookieParser = require('cookie-parser');

const router = require('./routes');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static('public'));

db.connect();
router.route(app);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server has started');
})