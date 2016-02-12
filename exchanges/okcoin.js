'use strict';

var OKCoin = require('okcoin-ws');
var okcoin = new OKCoin('com');


module.exports = function(io) {
    console.log('Registering OKCoin..');

    okcoin.subscribe({
        ok_btcusd_ticker: function (data, err) {
            if (err) {
                throw err;
            }

            // persist data for every tick
            var md = {
                provider: 'okcoin',
                low: data.low,
                high: data.high,
                close: data.last,
                ask: data.sell,
                bid: data.buy,
                timestamp: data.timestamp,
                volume: data.vol
            };

            console.log('okcoin trade', md);
            io.emit('market data', md);
        }
    });
};
