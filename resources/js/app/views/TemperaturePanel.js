/*global home, Backbone*/


(function () {
    'use strict';

    home.Views.TemperaturePanel = Backbone.View.extend({
        config: {},

        initialize: function () {
            this.$el = $(this.template(this.model.toJSON()));
        },

        render: function () {
            this.delegateEvents(this.events);

            home.util.initializeModelViews(this.$el);

            return this.$el;
        }

    });

})();
