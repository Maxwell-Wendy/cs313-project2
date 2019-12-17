module.exports = function(app) {
    app.post('/changeBookDetails', changeBookDetails);
}

var getBookFromDatabase = require('./getBookFromDatabase');

function changeBookDetails(req, res) {
    console.log("Getting book info to prepare for updates");

    var searchText = req.body.searchText;
    var nextStep = req.body.nextStep;
    var searchBy = req.body.searchBy;
    

    getBookFromDatabase.getBookFromDatabase(searchText, searchBy, function(error, result) {
        console.log("Here's the result ", result);
    });
}