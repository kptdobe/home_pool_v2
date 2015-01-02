var sqlite3 = require('sqlite3');
var utils = require('../utils.js');

module.exports = function (config) {
    // setup database connection for logging
    var db = new sqlite3.Database(config.db);

    function insert(data) {
        var statement = db.prepare("INSERT INTO logger_sensors VALUES (?, ?, ?)");
        statement.run(Date.now(), data.id, data.value);
        statement.finalize();
    }

    function readAll(id, startTime, maxRecords, callback) {
        id = id || '%';
        startTime = startTime || Date.now() - 1000 * 60 * 60 * 24; //default to last 24h
        maxRecords = maxRecords || -1;

        db.all("SELECT * FROM (SELECT * FROM logger_sensors WHERE id like ? AND time > (strftime('%s',?)*1000) ORDER BY time DESC LIMIT ?) ORDER BY time;", id, startTime, maxRecords, callback);
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