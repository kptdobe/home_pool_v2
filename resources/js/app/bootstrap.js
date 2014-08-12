/*global screens, $*/

(function () {

    home.util.loadTemplates(["Loading","Loading16","Switch", "TemperatureDisplay", "TemperatureInput", "Scheduler"],function () {
        home.init();
        new home.Views.App();
    });

}());
