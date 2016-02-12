'use strict';

var fs = require('fs');

module.exports = function (io) {
	// load up modularized exhanges
	// drop future implementations in the `exchangesPath` and magic happens	
	fs.readdirSync(__dirname).forEach(function (exchange) {
		if (exchange === 'index.js') {
			return;
		}

		require('./' + exchange)(io);
	});

};
