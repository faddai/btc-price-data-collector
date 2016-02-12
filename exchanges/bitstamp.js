'use strict';

var Bitstamp = require('bitstamp-ws');

var ws = new Bitstamp({order_book: false, diff_order_book: false, live_trades: true});

module.exports = function (io) {
    console.log('Registering Bitstamp..');
    /**
     * When a trade happens on Bitstamp,
     * retrieve the details of the trade and notify all interested parties
     */
    ws.on('trade', function(trade) {
        trade.timestamp = Date.now() / 1000; // in seconds not milliseconds

        var md = {
            provider: 'bitstamp',
            volume: trade.amount,
            tid: trade.id,
            timestamp: trade.timestamp,
            close: trade.price,
            symbol: 'USD'
        };
        
        console.log('bitstamp trade', md);
        io.emit('market data', md);
    });

};
