/*global home, Backbone*/


(function () {
    'use strict';

    home.Views.Temperature = Backbone.View.extend({
        config: {},

        initialize: function () {
            var self = this;
            this.model.bind("change:value", function() {
                self.updateTemperature();
            }).bind("request", function() {
                self.handleLoading();
            });
            this.$el = $(this.template(this.model.toJSON()));
            this.$label = this.$el.find(".label");
        },

        render: function () {



//            this.config = this.label.data("config");
//            this.btn.removeData("config");

            this.delegateEvents(this.events);

            return this.$el;
        },

        updateTemperature: function() {
            var v = this.model.get("value");
            this.$label.html(v + " ºC");
        },

        handleLoading: function() {
            console.log("loading...");
            this.$label.html(new home.Views.Loading16().render());
        }


    });

})();
