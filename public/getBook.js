module.exports = function(app) {
    app.post('/getBook', getBook);
}

var getBookFromDatabase = require('./getBookFromDatabase');

function getBook(req, res) {
    console.log("Getting book info");

    var searchText = req.body.searchText;
    var nextStep = req.body.nextStep;
    var searchBy = req.body.searchBy;
    

    getBookFromDatabase.getBookFromDatabase(searchText, searchBy, function(error, result) {
        console.log("Here's the result ", result);
        var message = "";
        var params = { result: result, message: message };

        for (i=0; i < result.length; i++) {
            Object.entries(result[i]).forEach(
                ([key, value]) => console.log(key, value)
            );
            
            var title = result[i].title;
            console.log(title);
            var author = result[i].author;
            console.log(author);
            var id = result[i].id;
            console.log(id);
            var googleid = result[i].googleid;
            console.log(googleid);
        }
        if (nextStep == "search") {
            res.render('searchUserBooks', params);
        }
        else if (nextStep == "change") {
            res.render('modifyUserBooks', params);
        }
        else {
            message = "Here are your search results.";
            res.render('showUserBooksList', params);
        }
    });
}