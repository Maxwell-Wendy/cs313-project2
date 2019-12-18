module.exports.updateDB = updateDB;

const { Pool } = require('pg');
var session = require('express-session');

const connectionString = process.env.DATABASE_URL || "postgres://bookcataloguser:read@localhost:5432/bookcatalog";
const pool = new Pool({connectionString: connectionString});
    

function updateDB (userid, bookid, isread, isowned, iswishlist, callback) {

    params = [userid, bookid, isread, isowned, iswishlist]

    var sql =   "UPDATE book_user " +
                "SET is_read = $3::boolean, " +
                    "is_owned = $4::boolean, " +
                    "is_wishlist = $5::boolean " +
                "WHERE user_id = $1::int " +
                "AND book_id = $2::text;";

        console.log("updating book")

        pool.query(sql, params, function(err, result) {
            if (err) {
                console.log("error in update");
                
            }

            callback(null, result);
        });
}