/*global screens, context, Backbone*/

(function () {
    'use strict';

    home.Models.TemperatureDisplay = Backbone.Model.extend({
        sync: function (method, model, options) {
            options.url = this.get("url");

            return Backbone.sync.call(this, method, model, options);

        },

        initialize: function () {},

        defaults: {}
    });

})();
