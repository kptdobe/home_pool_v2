var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')

var app = express()

// parse application/json
app.use(bodyParser.json())
app.use("/",express.static(__dirname + '/resources'));

app.listen(process.env.PORT || 8080);

var storage = require('./server/persistence.js');



//var cronJob = require('cron').CronJob;
//new cronJob('* * * * * *', function(){
//    console.log('You will see this message every second');
//}, null, true);


app.all('/api/*', function(req, res){
    var options = {
        hostname: 'rasppg',
        port: 80,
        path: req.url.substring(4),
        method: req.method
    };

    var creq = http.request(options, function(cres) {

        // set encoding
        cres.setEncoding('utf8');

        // wait for data
        cres.on('data', function(chunk){
            //transform plain/text response to JSON
            res.json({
                value: chunk
            });
        });

        cres.on('close', function(){
            res.end();
        });

        cres.on('end', function(){
            res.end();
        });
    }).on('error', function(e) {
        // we got an error, return 500 error to client and log error
        res.writeHead(500);
        res.end();
    });

    creq.end();
});

var rdata = express.Router();
rdata.route('/data')
    .post(function(req, res) {
        storage.write("data", req.body.id, req.body);
        res.json(storage.read("data", req.body.id));
    })

    .get(function(req, res) {
        res.json(storage.read("data"));
    });
rdata.route('/data/:id')
    .get(function(req, res) {
        res.json(storage.read("data", req.params.id));
    })
    .put(function(req, res) {
        storage.write("data", req.params.id, req.body);
        res.json(storage.read("data", req.params.id));
    })
    .delete(function(req, res) {
        storage.removeItem("data", req.params.id);
        res.json({ message: 'Successfully deleted' });
    });
app.use('/persist', rdata);


var rtasks = express.Router();
rtasks.route('/tasks')
    .post(function(req, res) {
        storage.write("scheduler", req.body.id, req.body);
        res.json(storage.read("scheduler", req.body.id));
    })

    .get(function(req, res) {
        res.json(storage.read("scheduler"));
    });
rtasks.route('/tasks/:id')
    .get(function(req, res) {
        res.json(storage.read("scheduler", req.params.id));
    })
    .put(function(req, res) {
        storage.write("scheduler", req.params.id, req.body);
        res.json(storage.read("scheduler", req.params.id));
    })
    .delete(function(req, res) {
        storage.removeItem("scheduler", req.params.id);
        res.json({ message: 'Successfully deleted' });
    });
app.use('/scheduler', rtasks);