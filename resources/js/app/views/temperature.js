/*global home, Backbone*/


(function () {
    'use strict';

    home.Views.Temperature = Backbone.View.extend({
        config: {},

        initialize: function () {
            var self = this;
            this.model.bind("change:value", function() {
                self.updateTemperature();
            })
        },

        render: function () {
            this.$el = $(this.template(this.model.toJSON()));

//            this.config = this.label.data("config");
//            this.btn.removeData("config");

            this.delegateEvents(this.events);

            return this.$el;
        },

        updateTemperature: function() {
            var v = this.model.get("value");
            this.$el.html(v + " ºC");
        }


    });

})();
