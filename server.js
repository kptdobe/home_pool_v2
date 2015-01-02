var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var masterConfig = JSON.parse(fs.readFileSync('./master_config.json'));

var app = express();

// parse application/json
app.use(bodyParser.json());
app.use("/", express.static(__dirname + '/resources'));

var server = app.listen(process.env.PORT || 8080);
console.log("[START] Initialized server on port " + server.address().port);

var h = masterConfig.gpio.proxy.hostname;
var p = masterConfig.gpio.proxy.port;
console.log('[START] GPIO API proxied to ' + h + ':' + p + '/api');

//route /api to gpio proxy
app.all('/api/*', function (req, res) {
    var options = {
        hostname: h,
        port: p,
        path: req.url.substring(4),
        method: req.method
    };

    var creq = http.request(options, function (cres) {

        // set encoding
        cres.setEncoding('utf8');

        // wait for data
        cres.on('data', function (chunk) {
            //transform plain/text response to JSON
            res.json({
                value: chunk
            });
        });

        cres.on('close', function () {
            res.end();
        });

        cres.on('end', function () {
            res.end();
        });
    }).on('error', function (e) {
        // we got an error, return 500 error to client and log error
        res.writeHead(500);
        res.end();
    });

    creq.end();
});

var storage = require('./server/persistence.js');

//route /data to storage
var rdata = express.Router();
rdata.route('/data')
    .post(function (req, res) {
        storage.write("data", req.body.id, req.body);
        res.json(storage.read("data", req.body.id));
    })

    .get(function (req, res) {
        res.json(storage.read("data"));
    });
rdata.route('/data/:id')
    .get(function (req, res) {
        res.json(storage.read("data", req.params.id));
    })
    .put(function (req, res) {
        storage.write("data", req.params.id, req.body);
        res.json(storage.read("data", req.params.id));
    })
    .delete(function (req, res) {
        storage.removeItem("data", req.params.id);
        res.json({message: 'Successfully deleted'});
    });
app.use('/persist', rdata);

//route /tasks to scheduler
var rtasks = express.Router();
rtasks.route('/tasks')
    .post(function (req, res) {
        storage.write("scheduler", req.body.id, req.body);
        res.json(storage.read("scheduler", req.body.id));
    })

    .get(function (req, res) {
        res.json(storage.read("scheduler"));
    });
rtasks.route('/tasks/:id')
    .get(function (req, res) {
        res.json(storage.read("scheduler", req.params.id));
    })
    .put(function (req, res) {
        storage.write("scheduler", req.params.id, req.body);
        res.json(storage.read("scheduler", req.params.id));
    })
    .delete(function (req, res) {
        storage.removeItem("scheduler", req.params.id);
        res.json({message: 'Successfully deleted'});
    });
app.use('/scheduler', rtasks);

//app
//require('./server/crontasks.js');
//var pool = require('./server/app/pool.js')();
//
//pool.start();
//console.log(pool.getParameters());
//pool.stop();

var rLog = express.Router();
app.use('/log', rLog);

if (masterConfig.loggers) {
    var logger = require('./server/loggers/sensors')({
        router: rLog,
        server: server,
        db: masterConfig.loggers.db
    });

    if (masterConfig.loggers.crons) {
        for (var i = 0; i < masterConfig.loggers.crons.length; i++) {
            var l = masterConfig.loggers.crons[i];
            console.log('[START] Logging ' + l.url + ' each ' + l.interval + ' ms.');
            setInterval(function () {
                logger.log({
                    url: l.url
                });
            }, l.interval);
        }
    }
}