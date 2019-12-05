var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://bookcataloguser:read@localhost:5432/bookcatalog";
const pool = new Pool({connectionString: connectionString});

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ 
    extended: true
}));
  
app.use(bodyParser.json());

app.set("port", (process.env.PORT || 5000));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', showForm);

app.post('/getBook', getBook);

app.listen(app.get("port"), function() {
    console.log("Listening on port: ", app.get("port"));
});

function showForm(req, res) {
    console.log("showing form");
    //res.send('hello');
    res.render('searchform', {title:"", author:""});
}

function getBook(req, res) {
    console.log("Getting book info");

    var searchText = req.body.searchText

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
            var params = {searchText: searchText, title: title, author: " by: " + author}

            res.render('searchform', params);
        }
    })
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
    })
}