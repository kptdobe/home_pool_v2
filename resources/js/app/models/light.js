/*global screens, context, Backbone*/

(function () {
    'use strict';

    home.Models.Light = Backbone.Model.extend({
        sync: function (method, model, options) {
            options.url = this.get("url");

            if (method === 'update' || method === 'create') {
                options.url += "/" + this.get("value");
            }

            return Backbone.sync.call(this, method, model, options);

        },

        initialize: function () {},

        defaults: {},

        toggle: function() {
            var v = home.util.notValue(this.get("value"));
            this.save("value", v);
        }
    });

})();
