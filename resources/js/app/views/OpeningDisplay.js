/*global home, Backbone*/


(function () {
    'use strict';

    home.Views.OpeningDisplay = Backbone.View.extend({
        config: {},

        initialize: function () {
            var self = this;
            this.model.bind("change:value", function() {
                self.updateStatus();
            }).bind("request", function() {
                self.handleLoading();
            }).bind("error", function() {
                self.updateStatus();
            });
            this.$el = $(this.template(this.model.toJSON()));
            this.$label = this.$el;
        },

        render: function () {
            this.$el = $(this.template(this.model.toJSON()));

            this.config = this.$el.data("config");
            this.$el.removeData("config");

            this.delegateEvents(this.events);

            this.updateStatus();

            return this.$el;
        },

        updateStatus: function() {
            var v = this.model.get("value");
            if( this.config[v] ) {
                this.$el.html(this.config[v].label);
                this.$el.removeClass(this.config[home.util.notValue(v)].css);
                this.$el.addClass(this.config[v].css);
            } else {
                this.$el.html("Etat inconnu");
            }
        },

        handleLoading: function() {
            this.$label.html(new home.Views.Loading16().render());
        }


    });

})();
