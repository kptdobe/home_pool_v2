/*global screens, $*/

(function () {

    home.util.loadTemplates(["Loading","Light", "Temperature"],function () {
        home.init();
        new home.Views.App();
    });

}());
