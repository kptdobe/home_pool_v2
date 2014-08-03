/*global home, context, Backbone*/

(function () {
    'use strict';

    home.Views.App = Backbone.View.extend({

        tagName: 'div',

        id: '',

        className: 'home-App',

        attributes: {
            'touch-action': 'none'
        },

        events: {},

        initialize: function () {
            var self = this;

            this.$el.appendTo(home.rootElement);
            this.loadingScreen = new home.Views.Loading(this.$el);

            window.setTimeout(function() {


                var l = new home.Models.Light({
                    url: "/api/light"
                });

                var vl = new home.Views.Light({
                    model: l
                });

                l.fetch({
                    success: function(data) {
                        self.loadingScreen.remove();
                    }
                });

                $(home.rootElement).append(vl.render());
            }, 100);



        }



    });

})();
