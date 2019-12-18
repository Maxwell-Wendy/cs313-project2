module.exports = function(app) {
    app.post('/login', login);
}

var getUserFromDatabase = require('./getUserFromDatabase');

var session = require('express-session');
const bcrypt = require('bcrypt');

function login (req, res){
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;

    console.log("username", username);
    console.log("password", password);

    getUserFromDatabase.getUserFromDatabase(username, password, function(error, result){
        console.log("Here's the result ", result);
        
        console.log(password);
        console.log(result[0].username);
        console.log(result[0].password);
        var userid = result[0].id;

        bcrypt.compare(password, result[0].password, function (err, result) {
            if (result == true){
                console.log("passwords match");
                if (req.session.username == undefined) {
                    req.session.username = username;
                    req.session.save();
                }
                if (req.session.userid == undefined) {
                    req.session.userid = userid;
                    req.session.save();
                }

                console.log("Session username: " + req.session.username);
                var message = "Welcome, " + req.session.username;
                var params = { result: result, message: message };
                res.render('welcome', params);
            }
            else {
                console.log("passwords don't match")
                var message = "There was a problem with your login";
                var params = { result: result, message: message };
                res.render('login', params);
            }
        });
    });
}
