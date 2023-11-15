// Create web server application to handle HTTP requests
// and deliver responses.
// ---------------------------------------------------------
var http = require('http');
var url = require('url');
var fs = require('fs');
var port = 8080;

// Create HTTP server to handle requests and deliver responses
var server = http.createServer(function(req, res) {
  var path = url.parse(req.url).pathname;
  switch (path) {
    // case '/':
    //   res.writeHead(200, {'Content-Type': 'text/html'});
    //   res.write('<h1>Hello! Try the <a href="/index.html">comments</a> page.</h1>');
    //   res.end();
    //   break;
    case '/index.html':
      fs.readFile(__dirname + path, function(err, data) {
        if (err) return send404(res);
        res.writeHead(200, {'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html'});
        res.write(data, 'utf8');
        res.end();
      });
      break;
    case '/json.js':
      fs.readFile(__dirname + path, function(err, data) {
        if (err) return send404(res);
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(data, 'utf8');
        res.end();
      });
      break;
    case '/comments.json':
      res.writeHead(200, {'Content-Type': 'text/json'});
      res.write(JSON.stringify(comments));
      res.end();
      break;
    case '/submit.json':
      if (req.method != 'POST') return send404(res);
      req.setEncoding('utf8');
      var body = '';
      req.on('data', function(data) {
        body += data;
      });
      req.on('end', function() {
        var comment = qs.parse(body);
        comment.id = Date.now();
        comments.push(comment);
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.write(JSON.stringify(comment));
        res.end();
      });
      break;
    default: send404(res);
  }
});

// Use the HTTP server to listen on the specified port
server.listen(port, function() {
  console.log('Listening on port ' + port);
});

// Function to send 404 responses
function send404(res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('Error 404: Resource not
