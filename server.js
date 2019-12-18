var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require('body-parser');
var ejs = require('ejs');
const request = require('request');
const bcrypt = require('bcrypt');
var session = require('express-session');
require('dotenv').config();

const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgres://bookcataloguser:read@localhost:5432/bookcatalog";
const pool = new Pool({connectionString: connectionString});

//var listOfBooks = [];
//var listOfIDs =[];
app.set('trust proxy', 1);
app.use(session({
    secret: 'very very secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ 
    extended: true
}));
  
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', displayHome);

var searchAPI = require('./public/searchAPI')(app);
var getBook = require('./public/getBook')(app);
var getDetails = require('./public/getDetails')(app);
var saveBook = require('./public/saveBook')(app);
var changeBookDetails = require('./public/changeBookDetails')(app);
var login = require('./public/login')(app);
var logout = require('./public/logout')(app);
var signup = require('./public/signup')(app);

app.listen(app.get('port'), function() {
    console.log("Listening on port: ", app.get('port'));
});

function displayHome(req, res) {
    console.log("Opening home page");
    res.render('index');
}


