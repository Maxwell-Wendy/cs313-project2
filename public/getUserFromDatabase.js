module.exports.getUserFromDatabase = getUserFromDatabase;

const { Pool } = require('pg');
var session = require('express-session');

const connectionString = process.env.DATABASE_URL || "postgres://bookcataloguser:read@localhost:5432/bookcatalog";
const pool = new Pool({connectionString: connectionString});

function getUserFromDatabase (username, password, callback) {

    console.log("username", username);
    var sql = "SELECT id, username, password FROM user_info WHERE username = $1::text;";
    params = [username];

    pool.query(sql, params, function(err, result) {
        if (err) {
            console.log("error in getting user");
        }
        console.log("found the user");
        callback(null, result.rows);
    })
}