module.exports.getBookFromDatabase = getBookFromDatabase;

const { Pool } = require('pg');
var session = require('express-session');

const connectionString = process.env.DATABASE_URL || "postgres://bookcataloguser:read@localhost:5432/bookcatalog";
const pool = new Pool({connectionString: connectionString});

function getBookFromDatabase (searchText, searchBy, username, callback) {
    console.log("get book with title " + searchText);
    var sql = "";

    if (searchText && searchBy == 'title') {
        sql =   "SELECT book.id AS id, book.title AS title, " +
                "book.author AS author, book.googleID AS googleID, " +
                "book_user.is_read AS read, book_user.is_owned AS owned, " +
                "book_user.is_wishlist AS wishlist, book_user.date_read AS dateread " +
                "FROM book_user " +
                "INNER JOIN book ON book_user.book_id = book.googleid " +
                "INNER JOIN user_info ON book_user.user_id = user_info.id " +
                "WHERE book.title = $1::text " +
                "AND user_info.username = $2::text;";
        params = [searchText, username];

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
    else if (searchText && searchBy == 'author') {
        sql =   "SELECT book.id AS id, book.title AS title, " +
                "book.author AS author, book.googleID AS googleID, " +
                "book_user.is_read AS read, book_user.is_owned AS owned, " +
                "book_user.is_wishlist AS wishlist, book_user.date_read AS dateread " +
                "FROM book_user " +
                "INNER JOIN book ON book_user.book_id = book.googleid " +
                "INNER JOIN user_info ON book_user.user_id = user_info.id " +
                "WHERE book.author = $1::text " +
                "AND user_info.username = $2::text;";
        params = [searchText, username];

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
        sql =   "SELECT book.id AS id, book.title AS title, " +
                "book.author AS author, book.googleID AS googleID, " +
                "book_user.is_read AS read, book_user.is_owned AS owned, " +
                "book_user.is_wishlist AS wishlist, book_user.date_read AS dateread " +
                "FROM book_user " +
                "INNER JOIN book ON book_user.book_id = book.googleid " +
                "INNER JOIN user_info ON book_user.user_id = user_info.id";

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