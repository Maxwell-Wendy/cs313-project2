var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
//const axios = require('axios');
const request = require('request');
require('dotenv').config();

const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgres://bookcataloguser:read@localhost:5432/bookcatalog";
const pool = new Pool({connectionString: connectionString});

var listOfBooks = [];
var listOfIDs =[];
var description = ";"

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ 
    extended: true
}));
  
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', showForm);

app.post('/searchAPI', searchAPI);

app.post('/getBook', getBook);

app.post('/getDetails', getDetails);

app.listen(app.get('port'), function() {
    console.log("Listening on port: ", app.get('port'));
});

function showForm(req, res) {
    console.log("showing form");
    //res.send('hello');
    var params = {listOfBooks: "", message: "", description: ""};
    res.render('searchform', params);
}

function searchAPI(req, res) {
    var searchText = req.body.searchText;

    searchGoogleAPI(searchText, function(error, result) {
        //console.log("Here's the result ", result);
        console.log(result.items.length);

        listOfBooks = [];
        //var bookURL = "";
        listOfIDs = [];

        message = "Here are the top 20 matches to your search term:"

        for(var i=0; i < result.items.length; i++) {
            var title = result.items[i].volumeInfo.title;
            console.log(title);

            var authors = result.items[i].volumeInfo.authors;
            //console.log(authors[0]);

            var id = result.items[i].id;
            console.log(id);
            
            //var author = authors[0];
            var author = authors;
            //var author = "";

            /*if(authors.length > 1){
                for(var j=1; j < authors.length; i++) {
                    author += ", " + authors[j];
                }
            }*/

            var book = title + ", by " + author;

            listOfBooks.push(book);
            listOfIDs.push(id);

            //var params = {searchText: searchText, title: title, author: " by: " + author};
            //var params = {book: book};
            //res.render('searchform', params);
        }
        //var title = result.items[0].volumeInfo.title;
        //console.log(title);

        //var author = result.items[0].volumeInfo.authors[0];


        //var params = {searchText: searchText, title: title, author: " by: " + author};
        var params = {listOfBooks: listOfBooks, listOfIDs: listOfIDs, message: message, description: ""};
        res.render('searchform', params);
    });
}

function getBook(req, res) {
    console.log("Getting book info");

    var searchText = req.body.searchText;

    getBookFromDatabase(searchText, function(error, result) {
        console.log("Here's the result ", result);
        console.log(result.length);

        for (i=0; i < result.length; i++) {
            Object.entries(result[i]).forEach(
                ([key, value]) => console.log(key, value)
            );
            
            var title = result[i].title;
            console.log(title);

            var author = result[i].author;
            console.log(author);
            var params = {searchText: searchText, title: title, author: " by: " + author};

            res.render('searchform', params);
        }
    });
}

function getBookFromDatabase (searchText, callback) {
    console.log("get book with title " + searchText);
    const sql = "SELECT id, title, author FROM book WHERE title = $1::text";
    params = [searchText];

    pool.query(sql, params, function(err, result) {
        if (err) {
            console.log("error in search");
            callback(err, null);
        }
        console.log("here's the book " + JSON.stringify(result.rows));
        callback(null, result.rows);
    });
}

function searchGoogleAPI (input, callback) {
    const myapikey = process.env.GOOGLE_API_KEY;

    var url = 'https://www.googleapis.com/books/v1/volumes/?maxResults=20&apikey=' + myapikey;
    url = url + "&q=" + input;
    request(url, {json: true },(err, res, body) => {
        if(err) { return console.log(err); }
    // For debugging purposes, make a note that we're back
    console.log('Back from server with the following results:');
    console.log(body);
    console.log("here is just the first one on the list");
    console.log(body.items[0]);

    callback(null, body);
  });
}

function getDetails(req, res) {
    var id = req.body.test;
    //var id = req.body.id;
    //var id = req.body.id
    console.log("Here's the id", id);
    searchGoogleAPI(id, function(error, result) {
        console.log(result.items.length);

        var title = result.items[0].volumeInfo.title;
        console.log("this is the title", title);

        var authors = result.items[0].volumeInfo.authors;
        var author = authors[0];
        console.log(authors);
        console.log(author);

        var description = result.items[0].volumeInfo.description;

        message = "Here are the details for your selected book";
        listOfIDs = "";
        listOfBooks = "";

        bookDetails = title + " by " + author + "<br>" + description;

        var params = {listOfBooks: listOfBooks, listOfIDs: listOfIDs, message: message, description: description};
        res.render('searchform', params);

    });
}

function getDetailsFromAPI (input, callback) {
    const myapikey = process.env.GOOGLE_API_KEY;
    var url = input + "&apikey=" + myapikey;
    request(url, {json: true },(err, res, body) => {
        if(err) { return console.log(err); }
    // For debugging purposes, make a note that we're back
    console.log('Back from server with the following results:');
    console.log(body);

    callback(null, body);
  });
}
