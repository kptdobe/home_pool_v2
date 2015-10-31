/*global screens, $*/

(function () {

    home.util.loadTemplates(["Loading","Loading16","OpeningDisplay", "Switch", "TemperatureDisplay", "TemperatureInput", "TemperaturePanel", "Scheduler"],function () {
        home.init();
        new home.Views.App();
    });

}());
