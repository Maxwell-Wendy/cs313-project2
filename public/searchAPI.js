module.exports = function(app) {
    app.post('/searchAPI', searchAPI);
}

var searchGoogleAPI = require('./searchGoogleAPI');

function searchAPI(req, res) {
    var text = req.body.searchText;
    var searchBy = req.body.searchBy;
    var searchText = searchBy + text;
    console.log(text);
    console.log(searchBy);
    console.log(searchText);

    
    searchGoogleAPI.searchGoogleAPI(searchText, function(error, result) {
        console.log(result.items.length);

        listOfBooks = [];
        listOfIDs = [];

        message = "Here are the top 20 matches to your search term. Select a book to show its details."

        for(var i=0; i < result.items.length; i++) {
            var title = result.items[i].volumeInfo.title;
            console.log(title);

            var author = result.items[i].volumeInfo.authors;
            
            var id = result.items[i].id;
            console.log(id);

            var book = title + " by " + author;

            listOfBooks.push(book);
            listOfIDs.push(id);
        }
        
        var params = {listOfBooks: listOfBooks, 
                        listOfIDs: listOfIDs};
        res.render('getDetails', params);
    });
}
