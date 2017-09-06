var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  if (request.method == 'GET' && parsedUrl.pathname == '/listings') {
    fs.readFile('listings.json', 'utf8', function(err, data) {
      if (err) throw err;
      listingData = data;
      response.write(listingData);
      response.end();
    });
   } else {
    response.writeHead(404, {'Content-Type': 'text/plain' });
    response.end('Bad gateway error');
   }
};
var server = http.createServer(requestHandler);
server.listen(port, function() {
});
