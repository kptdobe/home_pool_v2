/*global home, $*/

(function () {
    window.home = {
        util: {},
        Models: {},
        Collections: {},
        Views: {},
        Routers: {},
        init: function () {
            console.log("Bootstrapping application");

            home.rootElement = $("body")[0];

            home.contextPath = "/";
            home.resourceFolder = home.contextPath + "res/";
//            home.event = _.extend({}, Backbone.Events);

            // setup data
//            screens.screen = new screens.Collections.Screen();
//            screens.container = new screens.Collections.Container();

        }
    };

}());
