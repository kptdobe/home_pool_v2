/*global home, Backbone*/


(function () {
    'use strict';

    home.Views.Light = Backbone.View.extend({
        events: {
            "click .btn": "handleClick"
        },

        config: {},

        initialize: function () {
            var self = this;
            this.model.bind("change:value", function() {
                self.updateButton();
            })
        },

        render: function () {
            var r = this.$el.html(this.template(this.model.toJSON()));

            this.btn = this.$el.find(".btn");
            this.config = this.btn.data("config");

            return r;
        },

        handleClick: function() {
            this.model.toggle();
        },

        updateButton: function() {
            var v = this.model.get("value");
            this.btn.html(this.config[v].label);
            this.btn.removeClass(this.config[home.util.notValue(v)].css);
            this.btn.addClass(this.config[v].css);
        }


    });

})();
