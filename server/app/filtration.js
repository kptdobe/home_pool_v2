var http = require('http');
var storage = require('../persistence.js');

module.exports = function(server) {
    var FILTRATION_URL = "/api/pool/filtration";

    var start = function () {
        var tasks = storage.read("scheduler");
        var data = storage.read("data");

        var filtration = tasks["filtration"];
        var poolTemperature = data["poolTemperature"];
        console.log("filtration", filtration);
        console.log("poolTemperature", poolTemperature);

        if (filtration && filtration.data) {
            get(filtration.data.url, function(json) {
                console.log("JSON resp",json);
            });

        }

    };
    start();

    var startFiltration = function() {
        post(FILTRATION_URL, {
            value: 1
        });
    };

    var stopFiltration = function() {
        post(FILTRATION_URL, {
            value: 0
        });
    }
};

