module.exports = function(app) {
    app.post('/signup', signup);
}
var session = require('express-session');

var saveUserToDB = require('./saveUserToDB');

const bcrypt = require('bcrypt');

function signup(req, res) {
    console.log("saving user info");

    var username = req.body.username;
    console.log("username: ", username);
    var password = req.body.password;
    console.log("password: ", password);
    
    var hashedpassword = bcrypt.hashSync(password, 10);

    saveUserToDB.saveUserToDB(username, hashedpassword, function(error, result) {
        
        if (result) {
            var message = "User saved.";
            console.log("just checking..."); 
            var params = { message: message };
            res.render('showSavedStatus', params);
        }
        else {
            var message = "There was a problem saving the user. Duplicate usernames are not allowed.";
            console.log("problems...");
            var params = { message: message };
            res.render('showSavedStatus', params);
        }
        
    });
}