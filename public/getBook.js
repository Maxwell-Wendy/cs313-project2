module.exports = function(app) {
    app.post('/getBook', getBook);
}

var getBookFromDatabase = require('./getBookFromDatabase');

function getBook(req, res) {
    console.log("Getting book info");

    var searchText = req.body.searchText;

    //var text = req.body.searchText;
    //var constraint = req.body.constraint;
    //var searchText = constraint + "'" + text +"'";

    getBookFromDatabase.getBookFromDatabase(searchText, function(error, result) {
        console.log("Here's the result ", result);
        //console.log(result.length);
        var params = {
            title: title, 
            author: author,
            result: result};

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
            var googleID = result[i].googleid;
            console.log(googleID);
        }
        res.render('showUserBook', params);
    });
}