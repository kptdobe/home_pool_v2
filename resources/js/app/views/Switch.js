/*global home, Backbone*/


(function () {
    'use strict';

    home.Views.Switch = Backbone.View.extend({
        events: {
            "click ": "handleClick"
        },

        config: {},

        initialize: function () {
            var self = this;
            this.model.bind("change:value", function() {
                self.updateButton();
            })
        },

        render: function () {
            this.$el = $(this.template(this.model.toJSON()));
            this.$el.html(new home.Views.Loading16().render());


            this.config = this.$el.data("config");
            this.$el.removeData("config");

            this.delegateEvents(this.events);

            return this.$el;
        },

        handleClick: function() {
            this.model.toggle();
        },

        updateButton: function() {
            var v = this.model.get("value");
            if( this.config[v] ) {
                this.$el.html(this.config[v].label);
                this.$el.removeClass(this.config[home.util.notValue(v)].css);
                this.$el.addClass(this.config[v].css);
            } else {
                this.$el.html("Etat inconnu");
            }
        }


    });

})();
