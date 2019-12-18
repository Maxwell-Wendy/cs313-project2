module.exports = function(app) {
    app.post('/changeBookDetails', changeBookDetails);
}

var updateDB = require('./updateDB');
var session = require('express-session');

function changeBookDetails(req, res) {
    console.log("Getting book info to prepare for updates");

    var searchText = req.body.searchText;
    var nextStep = req.body.nextStep;
    var searchBy = req.body.searchBy;
    var isread = req.body.isread;
    var isowned = req.body.isowned;
    var iswishlist = req.body.iswishlist;
    var userid = req.session.userid;
    var bookid = req.body.bookid;
    console.log("bookid", bookid);

    
    updateDB.updateDB(userid, bookid, isread, isowned, iswishlist, function(error, result){
        console.log("result", result);
        var message = "Book updated"
        var params = { message, message };
        res.render('welcome', params);
    });
}