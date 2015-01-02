var storage = require('../persistence.js');

module.exports = function() {
    var config = {
        PERSISTENCE_NS: "POOL",
        light: {
            url: "/api/pool/light"
        },
        temperature: {
            url: "/api/pool/temp"
        },
        heat: {
            url: "/api/pool/heat"
        },
        filtration: {
            url: "/api/pool/filtration"
        }
    };

    var defaultParameters = {
        heat: {
            desiredTemp: 18
        },
        filtration: {
            startTime: 0,
            duration: 0
        }
    };

    //Filtration
    var startFiltrationProcess = function() {
        console.log("startFiltrationProcess");
    };

    var stopFiltrationProcess = function() {
        console.log("stopFiltrationProcess");
    };

    //Heat
    var startHeatProcess = function() {
        console.log("startHeatProcess");
    };

    var stopHeatProcess = function() {
        console.log("stopHeatProcess");
    };




    var currentParameters = null;

    return {
        start: function () {
            currentParameters = this.getParameters();

            startFiltrationProcess();
            startHeatProcess();
        },

        stop: function () {
            stopHeatProcess();
            stopFiltrationProcess();
        },

        getParameters: function() {
            console.log("getParameters");
            var p = storage.read(config.PERSISTENCE_NS,"parameters");
            if( ! p ) {
                return defaultParameters;
            }
            return p;
        },

        setParameters: function(params) {
            console.log("setParameters", defaults);
            storage.write(config.PERSISTENCE_NS,"parameters", params);
        }
    };

};