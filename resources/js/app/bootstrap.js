/*global screens, $*/

(function () {

    home.util.loadTemplates(["Loading","Light"],function () {
        home.init();
        new home.Views.App();
    });

}());
