/*global screens, $*/

(function () {

    home.util.loadTemplates(["Loading","Loading16","Switch", "Temperature", "Scheduler"],function () {
        home.init();
        new home.Views.App();
    });

}());
