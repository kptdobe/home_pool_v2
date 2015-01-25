var sqlite3 = require('sqlite3');
var utils = require('../utils.js');
var util = require('util');
var mu = require('mu2');

module.exports = function (config) {
    // setup database connection for logging
    var db = new sqlite3.Database(config.db);
    mu.root = __dirname;

    var sensorsMap = {};

    function insert(data) {
        if (!data || !data.id || !sensorsMap[data.id]) return;

        var statement = db.prepare("INSERT INTO " + sensorsMap[data.id].dbTable + " VALUES (?, ?, ?)");
        statement.run(Date.now(), data.id, data.value);
        statement.finalize();
    }

    function readAll(id, startTime, maxRecords, callback) {
        startTime = startTime || Date.now() - 1000 * 60 * 60 * 24; //default to last 24h
        maxRecords = maxRecords || -1;

        if (id && sensorsMap[id]) {
            db.all("SELECT * FROM " + sensorsMap[id].dbTable + " WHERE id = ? AND time > (strftime('%s',?)*1000) ORDER BY time ASC LIMIT ?;", id, startTime, maxRecords, callback);
        } else {
            var tables = '';
            for (var s in sensorsMap) {
                tables += sensorsMap[s] + ' ,';
            }
            tables = tables.substring(0, tables.length - 1);
            db.all("SELECT * FROM " + tables + " WHERE time > (strftime('%s',?)*1000) ORDER BY time ASC LIMIT ?;", startTime, maxRecords, callback);
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

    config.router.route('/sensorsins')
        .get(function (req, res) {
            readAll(req.query.id, null, null, function(err, rows) {
                var t = req.query.id.indexOf('pool') != -1 ? 'logger_sensors_pool' : 'logger_sensors_garage';

                var mysql      = require('mysql');
                var connection = mysql.createConnection({
                    host     : 'heatrpi',
                    user     : 'pi',
                    password : 'alex10'
                });

                connection.connect();

                for(var i = 0;i<rows.length;i++) {
                    var r = rows[i];
                    var req = 'INSERT INTO '+t+'(logtime,id,temp) VALUES (' + r.time + ',\'' + r.id + '\',' + r.value + ');';
                    connection.query(req, function(err, rows, fields) {
                        if (err) throw err;
                    });

                }

                connection.end();
            });
        });

    config.router.route('/sensors/tchart')
        .get(function (req, res) {
            var series = [];
            if (req.query.id && sensorsMap[req.query.id]) {
                series.push(sensorsMap[req.query.id]);
            } else {
                for (var s in sensorsMap) {
                    series.push(sensorsMap[s]);
                }
            }

            var stream = mu.compileAndRender('./tchart.html', {
                id: 'tchart-' + Date.now(),
                series: series
            });
            stream.pipe(res);
        });

    return {
        log: function (sensor) {
            utils.get(config.server, sensor.id, function (data) {
                if (data && data.value) {
                    insert({
                        id: sensor.id,
                        value: data.value
                    });
                }
            });
        },

        load: function (sensors) {
            if (util.isArray(sensors)) {
                var logger = this;
                for (var i = 0; i < sensors.length; i++) {
                    var s = sensors[i];
                    s['url'] = '/log/sensors?id=' + s.id;
                    sensorsMap[s.id] = s;
                    if (s.log) {
                        console.log('[START] Logging ' + s.id + ' each ' + s.interval + ' ms.');
                        setInterval(function (sensor) {
                            logger.log(sensor);
                        }, s.interval, s);
                    }
                }
            }
        }
    }

};