/*global screens, $*/

(function () {

    home.util.loadTemplates(["Loading","Loading16","Light", "Temperature"],function () {
        home.init();
        new home.Views.App();
    });

}());
