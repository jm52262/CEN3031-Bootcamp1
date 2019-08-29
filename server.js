var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  switch(parsedUrl.pathname) {

    case '/':   //Reserved case for root directory, respond 404 as it is empty for now.
        response.statusCode = 404;
        response.end("Bad gateway error");
      break;

    case '/listings':   //Respond with JSON data for listings directory.
        response.writeHead(200, {"Content-Type": "application/json"});
        response.end(JSON.stringify(listingData, null, 3));
      break;

    default:  //Default response 404.
        response.statusCode = 404;
        response.end("Bad gateway error");

  }

};

fs.readFile('listings.json', 'utf8', function(err, data) {

  //Parse data from disk into JSON, check for error from JSON.parse() function.
  function readFileToJSON(data) {
    try {
      
      listingData = JSON.parse(data);
      
    } catch(e) {
      
      console.log(e);
      return false;
      
    }
    return true;
  }

  //Only create & start server if parsing JSON was successful.
  if(readFileToJSON(data)){
    
    // Create Server
    server = http.createServer(requestHandler);
    
    // Start Server
    server.listen(port, function() {
      console.log('Server listening on: http://127.0.0.1:' + port);
    });

  }

});
