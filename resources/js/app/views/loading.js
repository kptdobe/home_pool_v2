/*global home, Backbone*/


(function () {
    'use strict';

    home.Views.Loading = Backbone.View.extend({
        initialize: function (root) {
            this.render().appendTo(root);
        },

        render: function () {
           return this.$el.html(this.template({resourceFolder: home.resourceFolder}));
        }

    });

})();
