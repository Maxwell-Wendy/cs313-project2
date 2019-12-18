module.exports.saveUserToDB = saveUserToDB;

var session = require('express-session');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgres://bookcataloguser:read@localhost:5432/bookcatalog";
const pool = new Pool({connectionString: connectionString});

function saveUserToDB (username, password, callback) {
    console.log("save user", username);
    console.log("save hashed password", password);
    params = [username, password];
    const sql = "INSERT INTO user_info (username, password) VALUES ($1::text, $2::text)";
    

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
