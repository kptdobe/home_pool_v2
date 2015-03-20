/*global screens, $*/

(function () {

    home.util.loadTemplates(["Loading","Loading16","OpeningDisplay", "Switch", "TemperatureDisplay", "TemperatureInput", "Scheduler"],function () {
        home.init();
        new home.Views.App();
    });

}());
