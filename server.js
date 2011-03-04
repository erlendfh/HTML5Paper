var express = require('express');
var http = require('http');
var io = require('socket.io');

var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

function proxyRequest(host, path, res) {
  var ap = http.createClient(80, host);
  var editionReq = ap.request('GET', path, {
    'host': host
  });
  editionReq.on('response', function(editionRes) {
    res.writeHead(200);
    
    editionRes.on('data', function (chunk) {
      res.write(chunk);
    });
    
    editionRes.on('end', function () {
      res.end();
    });
  });
  
  editionReq.end();
}

app.get('/data/edition', function (req, res) {
  proxyRequest('brett.medianorge.no', '/ipad/ws/secure/edition', res);
});

app.get('/data/frontpage', function (req, res) {
  proxyRequest('brett.medianorge.no', '/ipad/ws/frontpage', res);
});


socket = io.listen(app);
var clients = [];
var startTime = new Date().getTime();
socket.on('connection', function (client) {
  client.send(startTime);
});


if (!module.parent) {
  app.listen(process.env.CCL_PORT || 9090);
  console.log("Express server listening on port %d", app.address().port)
}
