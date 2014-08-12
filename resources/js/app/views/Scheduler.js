/*global home, Backbone*/


(function () {
    'use strict';

    home.Views.Scheduler = Backbone.View.extend({
        config: {},

        initialize: function () {

        },

        render: function () {
            this.$el = $(this.template(this.model.toJSON()));

            this.delegateEvents(this.events);

            this.start = this.$el.find("[name='task-start']");
            this.stop = this.$el.find("[name='task-stop']");
            this.button = this.$el.find(".btn-task-update");

            this.start.attr("value", this.model.get("start"));
            this.stop.attr("value", this.model.get("stop"));

            var self = this;
            this.button.on("click", function() {
                self.model.save();
            });

            this.start.on("change", function() {
                self.model.set("start", this.value);
            });

            this.stop.on("change", function() {
                self.model.set("stop", this.value);
            });

            return this.$el;
        }

    });

})();
