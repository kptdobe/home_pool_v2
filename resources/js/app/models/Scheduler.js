/*global screens, context, Backbone*/

(function () {
    'use strict';

    home.Models.Scheduler = Backbone.Model.extend({
        urlRoot: "/scheduler/tasks",

        idAttribute: "id",

        defaults: {
            start: null,
            stop: null,
            id: null
        },


//        sync: function (method, model, options) {
//            options.url = this.get("url");
//
//            return Backbone.sync.call(this, method, model, options);
//
//        },

        initialize: function () {}
    });

})();
