var request = require('request'),
    url = require('url'),
    fs = require('fs'),
    express = require('express'),
    socket_io = require('socket.io'),
    util = require('util'),
    querystring = require('querystring'),
    vm = require('vm'),
    http = require('http');
    https = require('https');

 require('ssl-root-cas').inject();
 require('ssl-root-cas').addFile('/home/blackcr/ssl/certs/chpride_com_b21c8_60029_1499593478_f7e79247719d128678ff0c073cee48a2.crt');
 require('ssl-root-cas').addFile('/home/blackcr/ssl/keys/b21c8_60029_8d6a5cd39bff839519b40866bc061fe5.key');

  try {
  var settings = vm.runInThisContext(fs.readFileSync(process.cwd() + '/nodejs.config.js'));
}
catch (exception) {
  console.log("Failed to read config file, exiting: " + exception);
  process.exit(1);
}


console.log('Hello Gaurav');
// Configure our HTTP server to respond with Hello World to all requests.
var server = https.createServer(function (request, response) {
	 var sslOptions = {
   key: fs.readFileSync(settings.sslKeyPath),
   cert: fs.readFileSync(settings.sslCertPath)
 };
 if (settings.sslCAPath) {
   sslOptions.ca = fs.readFileSync(settings.sslCAPath);
 }
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(49266);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");