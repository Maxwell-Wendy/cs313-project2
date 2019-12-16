module.exports.getBookFromDatabase = getBookFromDatabase;

const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgres://bookcataloguser:read@localhost:5432/bookcatalog";
const pool = new Pool({connectionString: connectionString});

function getBookFromDatabase (searchText, callback) {
    console.log("get book with title " + searchText);
    var sql = "";

    if (searchText) {
        sql = "SELECT id, title, author, googleID, isRead, isOwed, isWishList, dateRead FROM book WHERE title = $1::text;";
        params = [searchText];

        console.log("finding one book")

        pool.query(sql, params, function(err, result) {
            if (err) {
                console.log("error in search");
                callback(err, null);
            }
            console.log("here's the title", result.title);
            console.log("here's the book " + JSON.stringify(result.rows));
            callback(null, result.rows);
        });
    }
    else {
        sql = "SELECT id, title, author, googleID, isRead, isOwed, isWishList, dateRead FROM book;"

        console.log("finding all books")

        pool.query(sql, function(err, result) {
            if (err) {
                console.log("error in search");
                callback(err, null);
            }
           
            console.log("here's the book " + JSON.stringify(result.rows));
            console.log("here's the title", result.title);
            callback(null, result.rows);
        });
    } 
}