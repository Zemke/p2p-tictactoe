
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var reload = require('reload');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/connect', routes.connect);
app.get('/playing', routes.playing);
app.get('/error', routes.error);

var server = http.createServer(app);

reload(server, app); // https://github.com/jprichardson/reload

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
