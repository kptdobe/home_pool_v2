/*global home, Backbone*/


(function () {
    'use strict';

    home.Views.TemperatureInput = Backbone.View.extend({
        config: {},

        initialize: function () {

        },

        render: function () {
            this.$el = $(this.template(this.model.toJSON()));

            this.delegateEvents(this.events);

            this.input = this.$el.find("[name='temperature']");
            this.button = this.$el.find(".btn-temperature-update");

            this.input.attr("value", this.model.get("temperature"));

            var self = this;
            this.button.on("click", function() {
                self.model.save();
            });

            this.input.on("change", function() {
                self.model.set("temperature", this.value);
            });

            return this.$el;
        }

    });

})();
