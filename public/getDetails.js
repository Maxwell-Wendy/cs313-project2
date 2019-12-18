module.exports = function(app) {
    app.post('/getDetails', getDetails);
}

var searchGoogleAPI = require('./searchGoogleAPI');
var session = require('express-session');

function getDetails(req, res) {
    var id = req.body.id;
    var inDB = req.body.inDB;

    console.log("Here's the id", id);

    searchGoogleAPI.searchGoogleAPI(id, function(error, result) {
        console.log(result.items.length);

        var title = result.items[0].volumeInfo.title;
        console.log("this is the title", title);

        var authors = result.items[0].volumeInfo.authors;
        var author = authors[0];
        console.log(authors);
        console.log(author);

        var publisher = result.items[0].volumeInfo.publisher;
        var publishedDate = result.items[0].volumeInfo.publishedDate;
        var pageCount = result.items[0].volumeInfo.pageCount;
        var description = result.items[0].volumeInfo.description;
        var imageURL = result.items[0].volumeInfo.imageLinks.thumbnail;
        var id = result.items[0].id;

        message = "Here are the details for your selected book:";

        var params = {  message: message, 
                        title: title,
                        author: author,
                        publisher: publisher,
                        publishedDate: publishedDate,
                        pageCount: pageCount,
                        description: description, 
                        imageURL: imageURL,
                        id: id,
                        inDB: inDB};
        res.render('showDetails', params);
    });
}
