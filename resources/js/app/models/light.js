/*global screens, context, Backbone*/

(function () {
    'use strict';

    home.Models.Light = Backbone.Model.extend({

        initialize: function (attr) {
            var opt = attr || {};

            this.set('id', opt.id || home.util.guid());
            this.set('name', this.get('id'));
        },

        defaults: {

        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
