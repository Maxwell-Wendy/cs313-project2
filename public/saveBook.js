module.exports = function(app) {
    app.post('/saveBook', saveBook);
}

var saveBookToDB = require('./saveBookToDB');

function saveBook(req, res) {
    console.log("saving book info");

    var id = req.body.googleBookID;
    console.log("id: ", id);
    var title = req.body.title;
    console.log("title: ", title);
    var author = req.body.author;
    console.log("author", author);

    saveBookToDB.saveBookToDB(id, title, author, function(error, result) {
        
        if (result) {
            var message = "Book saved.";
            console.log("just checking..."); 
            var params = { message: message };
            res.render('showSavedStatus', params);
        }
        else {
            var message = "There was a problem saving the book. Duplicate books are not allowed.";
            console.log("problems...");
            var params = { message: message };
            res.render('showSavedStatus', params);
        }
        
    });
}