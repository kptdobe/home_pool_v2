/*global home, Backbone*/


(function () {
    'use strict';

    home.Views.Loading = Backbone.View.extend({

        template: function () {
            var tmpl = _.template('<div class="u-home-alignHorizontal">' +
                        '<div class="u-home-alignVertical">' +
                            '<img src="<%= resourceFolder %>wait_32.gif" />' +
                        '</div>' +
                    '</div>');

            return tmpl({resourceFolder: home.resourceFolder});
        },

        tagName: 'div',

        id: '',

        className: 'home-Loading',

        events: {},

        initialize: function (root) {
            this.render().appendTo(root);
        },

        render: function () {
           return this.$el.html(this.template());
        }

    });

})();
