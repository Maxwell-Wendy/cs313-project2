module.exports = function(app) {
    app.post('/logout', logout);
}

var session = require('express-session');

function logout (req, res){
    console.log(req.session.username);
    if (req.session.username) {
        req.session.destroy();
        res.json({success: true});
        console.log("the logout worked");
    }
    else {
        res.json({success: false});
        console.log("the logout didn't work");
    }
}