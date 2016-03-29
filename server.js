// set up ========================
//Secrets
var fs = require("fs");
var fileName = "./secrets.json";
var config;
try {
  config = require(fileName)
}
catch (err) {
  config = {};
  console.log("unable to read file '" + fileName + "': ", err);
  console.log("see secret-config-sample.json for an example");
}
var express  = require('express');
var app      = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use('/bower_components',  express.static(__dirname + '/bower_components')); //include bower_components
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// api ---------------------------------------------------------------------
// get daily stats hubbit
app.get('/api/hubbit', function(req, res) {
  var http = require('https');

  var options = {
    host: 'hubbit.chalmers.it',
    path: '/get_stats.json?timeframe=day',
    port: '443',
    headers: {'Authorization': 'Token token="'+config.hubbit+'"'}
  };
  callback = function(response) {
    var str = '';
    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });
    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      res.send(str);
    });
  };
  http.request(options, callback).end();
});

app.get('/api/vasttrafik-chalmers', function(req, res) {
  var http = require('https');

  var options = {
    host: 'api.vasttrafik.se',
    path: '/token?grant_type=client_credentials',
    method: 'POST',
    port: '443',
    headers: {'Authorization': 'Basic ' + config.vasttrafik,
      'Content-Type': 'application/x-www-form-urlencoded'}
  };

  var post_req = http.request(options, function(resp) {
    var accessKey = '';

    resp.on('data', function(chunk) {
      accessKey += chunk;
    });

    resp.on('end', function() {
      getDepartures(JSON.parse(accessKey).access_token);
    });
  });


  post_req.end();
  function getDepartures(accessToken) {
    var options = {
      host: 'api.vasttrafik.se',
      path: '/bin/rest.exe/v2/departureBoard?id=9021014001960000&date=2016-03-29&time=20%3A30&timeSpan=60&maxDeparturesPerLine=1&format=json',
      port: '443',
      headers: {'Authorization': 'Bearer ' + accessToken}
    };

    callback = function(response) {
      var str = '';

      response.on('data', function(chunk) {
        str += chunk;
      });

      response.on('end', function() {
        res.send(str);
      });
    };

    http.request(options, callback).end();
  }
});

// get schedule
app.get('/api/schedule', function(req, res) {
  var http = require('https');
  var options = {
    host: 'se.timeedit.net',
    path: '/web/chalmers/db1/public/ri15YXQ3041Z57Qv8X034156y8Y470155Y97Y1gQ0075X54Z14083Y5487Q7.json',
  };
  callback = function(response) {
    var str = '';
    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });
    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      res.send(str);
    });
  }
  http.request(options, callback).end();
});

// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file
});

// listen (start app with node server.js) ======================================
app.listen(3000);
console.log("App listening on port 3000");
