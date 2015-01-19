var sqlite3 = require('sqlite3');
var utils = require('../utils.js');
var util = require('util');
var mu = require('mu2');

module.exports = function (config) {
    // setup database connection for logging
    var db = new sqlite3.Database(config.db);
    mu.root = __dirname;

    function insert(data) {
        var statement = db.prepare("INSERT INTO logger_sensors VALUES (?, ?, ?)");
        statement.run(Date.now(), data.id, data.value);
        statement.finalize();
    }

    function readAll(id, startTime, maxRecords, callback) {
        startTime = startTime || Date.now() - 1000 * 60 * 60 * 24; //default to last 24h
        maxRecords = maxRecords || -1;

        if( id ) {
            db.all("SELECT * FROM logger_sensors WHERE id like ? AND time > (strftime('%s',?)*1000) ORDER BY time ASC LIMIT ?;", id, startTime, maxRecords, callback);
        } else {
            db.all("SELECT * FROM logger_sensors WHERE time > (strftime('%s',?)*1000) ORDER BY time ASC LIMIT ?;", startTime, maxRecords, callback);
        }
    }

    config.router.route('/sensors')
        .get(function (req, res) {
            readAll(req.query.id, req.query.startTime, req.query.maxRecords, function (err, rows) {
                if (err) {
                    res.writeHead(500, {"Content-type": "text/html"});
                    res.end(err + "\n");
                    return;
                }
                res.json({
                    total: rows.length,
                    records: rows
                });
            });
        });

    config.router.route('/sensors/tchart')
        .get(function (req, res) {
            var series = [{
                url: '/log/sensors?id=/api/pool/temp',
                name: 'Temperature Piscine'
            },{
                url: '/log/sensors?id=/api/garage/temp',
                name: 'Temperature Garage',
                last: true
            }];
            var stream = mu.compileAndRender('./tchart.html', {
                id: 'tchart-' + Date.now(),
                series: series
            });
            stream.pipe(res);
        });

    return {
        log: function (toLog) {
            utils.get(config.server, toLog.url, function (data) {
                if (data && data.value) {
                    insert({
                        id: toLog.url,
                        value: data.value
                    });
                }
            });
        }
    }

};