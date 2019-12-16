module.exports.searchGoogleAPI = searchGoogleAPI;
const request = require('request');

function searchGoogleAPI (input, callback) {
    const myapikey = process.env.GOOGLE_API_KEY;

    var url = 'https://www.googleapis.com/books/v1/volumes/?maxResults=20&apikey=' + myapikey;
    url = url + "&q=" + input;
    request(url, {json: true },(err, res, body) => {
        if(err) { return console.log(err); }
    // For debugging purposes
    console.log('Back from server with the following results:');
    console.log(body);
    console.log("here is just the first one on the list");
    console.log(body.items[0]);

    callback(null, body);
    
  });
}