module.exports.saveBookToDB = saveBookToDB;

const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgres://bookcataloguser:read@localhost:5432/bookcatalog";
const pool = new Pool({connectionString: connectionString});

function saveBookToDB (id, title, author, callback) {
    console.log("save book with title " + title);
    params = [id, title, author];
    const sql = "INSERT INTO book (googleid, title, author) VALUES ($1::text, $2::text, $3::text)";
    

    /*pool.query(sql, params, function(err, result) {
        if (err) {
            console.log("error in attempt to save");
            callback(err, null);
        }
        console.log("here's the book " + JSON.stringify(result.rows));
        callback(null, result.rows);
    });*/

    pool.query(sql, params, (err, res) => {
        if (err !== undefined) {
          // log the error to console
          console.log("Postgres INSERT error:", err);
      
          // get the keys for the error
          var keys = Object.keys(err);
          console.log("\nkeys for Postgres error:", keys);
      
          // get the error position of SQL string
          console.log("Postgres error position:", err.position);
        }
      
        // check if the response is not 'undefined'
        if (res !== undefined) {
          // log the response to console
          console.log("Postgres response:", res);
      
          // get the keys for the response object
          var keys = Object.keys(res);
      
          // log the response keys to console
          console.log("\nkeys type:", typeof keys);
          console.log("keys for Postgres response:", keys);
      
          if (res.rowCount > 0) {
            console.log("# of records inserted:", res.rowCount);
          } else {
            console.log("No records were inserted.");
          }
        }
        callback(null, res);
      });
}