var storage = require('./persistence.js');


var tasks = storage.read("scheduler");

if (tasks) {
    var cronJob = require('cron').CronJob;
    for (var key in tasks) {
        var task = tasks[key];
        console.log('Creating cron', task);

        var startFct = null;
        var stopFct = null;

        if (task.startFct) {
            try {
                eval("startFct =" + task.startFct);
            } catch (e) {
                console.error("Error evaluating {0} start function",key);
            }
        }

        if (task.stopFct) {
            try {
                eval("stopFct =" + task.stopFct);
            } catch (e) {
                console.error("Error evaluating {0} stop function",key);
            }

        }

        if (startFct) {
            new cronJob('' + task.start + ' * * * * *', startFct, null, true);

            //check if current time is between start and stop. If yes, execute startFct.
            var hour = new Date().getHours();
            if (task.start <= hour && hour < task.stop) {
                startFct.call();
            }
        }

        if (stopFct) {
            new cronJob('' + task.stop + ' * * * * *', stopFct, null, true);

            //check if current time is after stop. If yes, execute stopFct.
            var hour = new Date().getHours();
            if (task.stop >= hour) {
                stopFct.call();
            }
        }
    }
}