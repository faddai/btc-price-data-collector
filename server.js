'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 8086;

require('./exchanges')(io);

var sendDummyDataDownThePipe = function (s) {
	var providers = ['okcoin', 'bitstamp'];
	var data = {
		provider: providers[Math.floor(Math.random() * providers.length)], // pick a random provider
		close: (Math.random() * 100).toFixed(2)
	};

	s.emit('market data', data);
}

io.on('connection', function (socket) {
	console.log('A new socket connection established at ', new Date());

	socket.on('disconnect', function () {
		console.log('Client got disconnected');
	});

	/**
	* In case, for some reasons, we're aren't able to reach
	* the exchanges, we generate some data on our own
	*/
	// setInterval(sendDummyDataDownThePipe.bind(this, socket), Math.random()*1000);

});

http.listen(port, function () {
	console.log('Listening on *:'+ port);
});