var http = require('http');
var express = require('express');
var app = express();

app.use("/",express.static(__dirname + '/resources'));

app.listen(process.env.PORT || 8080);

//var p = require('./server/persistence.js');



//var cronJob = require('cron').CronJob;
//new cronJob('* * * * * *', function(){
//    console.log('You will see this message every second');
//}, null, true);


app.all('/api/*', function(req, res){

    var options = {
        hostname: 'pool',
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