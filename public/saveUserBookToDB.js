module.exports.saveUserBookToDB = saveUserBookToDB;

var session = require('express-session');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgres://bookcataloguser:read@localhost:5432/bookcatalog";
const pool = new Pool({connectionString: connectionString});

function saveUserBookToDB (user_id, book_id, callback) {
    console.log("save book with id " + book_id);
    params = [user_id, book_id];

    const sql = "INSERT INTO book_user (user_id, book_id) " +
                "VALUES ($1::int, $2::text);";
    
    pool.query(sql, params, (err, result) => {
        if (err !== undefined) {
            console.log("error in attempt to save", err);

        }
        if (result !== undefined) {
          if (result.rowCount > 0) {
            console.log("# of records inserted:", result.rowCount);
          } else {
            console.log("No records were inserted.");
          }
        }
        callback(null, result);
    });
}
