var path = require('path');
var ejs = require('ejs');
var express = require('express');
var http = require('http');
var fs = require('fs');
var basicAuth = require('basic-auth');
var Card = require("./Card");
var Deck = require("./Deck");
var dealer = require('./dealer');
var sockjs = require('sockjs');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));

var SCRIPTS_PATH = "js";
var scriptsFiles = fs.readdirSync(path.join(__dirname, "static/" + SCRIPTS_PATH));
var scripts = [];
scriptsFiles.forEach(function(fileName) {
	if(path.extname(fileName) == ".js") {
		scripts.push(path.join(SCRIPTS_PATH, fileName));
	}
});

var deck = new Deck.Deck();
deck.shuffle();

var clients = {};

var setup = function(sock) {
	sock.on('connection', function(conn) {
		clients[conn.id] = conn;
		for (var client in clients) {
			console.log(deck.dealInitial);
			clients[client].write({action: 'setup', deck: deck, dealer: dealer});
		}
		conn.on('data', function(message) {
			console.log(message);
		});

		conn.on('close', function() {
			delete clients[conn.id];
		});
	});
	return sock;
};

app.get('/', function(request, response) {
	var sock = sockjs.createServer();
	sock.installHandlers(server, {prefix: '/sock'});
	sock = setup(sock);
	response.render('index', {scripts: scripts});
});

var server = http.createServer(app)
server.listen(app.get('port'));


