/*global home, Backbone*/


(function () {
    'use strict';

    home.Views.TemperatureDisplay = Backbone.View.extend({
        config: {},

        initialize: function () {
            var self = this;
            this.model.bind("change:value", function() {
                self.updateTemperature();
            }).bind("request", function() {
                self.handleLoading();
            }).bind("error", function() {
                self.updateTemperature();
            });
            this.$el = $(this.template(this.model.toJSON()));
            this.$label = this.$el.find(".value");
        },

        render: function () {
            this.delegateEvents(this.events);

            return this.$el;
        },

        updateTemperature: function() {
            var v = this.model.get("value");
            if( v ) {
                console.log(v);
                var output = "" + Math.floor(v) + "<span>." + Math.floor((v % 1) * 10) + "</span><strong>&deg;</strong>";

                this.$label.html(output);
            } else {
                this.$label.html("Etat inconnu");
            }
        },

        handleLoading: function() {
            this.$label.html(new home.Views.Loading16().render());
        }


    });

})();
