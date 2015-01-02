var http = require('http');

module.exports.get = function (server, url, callback) {
    var options = {
        hostname: server.address().hostname,
        port: server.address().port,
        path: url,
        method: 'GET'
    };


    var req = http.request(options, function (res) {
        res.on('data', function (chunk) {
            callback(JSON.parse(chunk));
        });
    });
    req.end();
};

module.exports.post = function (server, url, data, callback) {
    var options = {
        hostname: server.address().hostname,
        port: server.address().port,
        path: url,
        method: 'POST',
        data: data
    };


    var req = http.request(options, function (res) {
        res.on('data', function (chunk) {
            callback(JSON.parse(chunk));
        });
    });
    req.end();
};