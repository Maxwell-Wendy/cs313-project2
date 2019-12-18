module.exports = function(app) {
    app.post('/saveBook', saveBook);
}

var saveBookToDB = require('./saveBookToDB');
var getUserFromDatabase = require('./getUserFromDatabase');
var saveUserBookToDB = require('./saveUserBookToDB');
var session = require('express-session');

function saveBook(req, res) {
    console.log("saving book to user's account");

    var id = req.body.googleBookID;
    console.log("id: ", id);
    var title = req.body.title;
    console.log("title: ", title);
    var author = req.body.author;
    console.log("author", author);

    var username = req.session.username;
    var user_id = req.session.userid;
    var book_id = id;
    var password = "";

    saveBookToDB.saveBookToDB(id, title, author, username, function(error, result) { 
        if (result) {
            console.log("saving book..."); 
        }
        else {
            console.log("problems...");
        } 
    });

    /*getUserFromDatabase.getUserFromDatabase(username, password, function(error, result){
        console.log("the results of the user search", result);
        user_id = result[0].id;
        console.log("user id: ", user_id);
        return user_id;
    });*/

    saveUserBookToDB.saveUserBookToDB(user_id, book_id, function(error, result) {

        if (result) {
            var message = "Book saved.";
            console.log("just checking..."); 
            var params = { message: message };
            res.render('showSavedStatus', params);
        }
        else {
            var message = "There was a problem saving the book.";
            console.log("problems...");
            var params = { message: message };
            res.render('showSavedStatus', params);
        } 
    });
}