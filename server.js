var express = require('express');
var app = express();

app.use("/",express.static(__dirname + '/resources'));

app.listen(process.env.PORT || 8080);

var p = require('./server/persistence.js');


var cronJob = require('cron').CronJob;
new cronJob('* * * * * *', function(){
    console.log('You will see this message every second');
}, null, true);

