var mysql = require('mysql');
var utils = require('../utils.js');
var util = require('util');
var mu = require('mu2');

module.exports = function (config) {
    // setup database connection for logging

    var pool  = mysql.createPool(config.db);

    mu.root = __dirname;

    var sensorsMap = {};

    function insert(data) {
        if (!data || !data.id || !sensorsMap[data.id]) return;

        var sql = "INSERT INTO " + sensorsMap[data.id].dbTable + " VALUES (?, ?, ?)";
        var inserts = [Date.now(), data.id, data.value];
        sql = mysql.format(sql, inserts);

        pool.query(sql, function(err, rows) {
            if( err ) throw err;
        });
    }

    function readAll(id, startTime, maxRecords, callback) {
        var cache = 1000 * 60 * 60; //benefit from db caching (1h cache)
        startTime = startTime || Math.round(Date.now() / cache ) * cache - 1000 * 60 * 60 * 24 * 7; //default to last 7 days
        maxRecords = maxRecords || null;

        if (id && sensorsMap[id]) {
            var sql = "SELECT * FROM " + sensorsMap[id].dbTable + " WHERE id = ? AND logtime > ? ORDER BY logtime ASC;";
            var inserts = [id, startTime];
            sql = mysql.format(sql, inserts);

            console.log('[DEBUG] Executing... ' + sql);

            pool.query(sql, callback);

        } else {
            var tables = '';
            for (var s in sensorsMap) {
                tables += sensorsMap[s].dbTable + ' ,';
            }
            tables = tables.substring(0, tables.length - 1);

            var sql = "SELECT * FROM " + tables + " WHERE logtime > ? ORDER BY logtime ASC;";
            var inserts = [startTime];
            sql = mysql.format(sql, inserts);

            console.log('[DEBUG] Executing... ' + sql);

            pool.query(sql, callback);
        }
    }

    config.router.route('/sensors')
        .get(function (req, res) {
            var time = Date.now();
            console.log('[DEBUG] Start readAll');
            readAll(req.query.id, req.query.startTime, req.query.maxRecords, function (err, rows) {
                console.log('[DEBUG] readAll query execution time: ' + (Date.now() - time) + 'ms.');
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