/*global home, context, Backbone*/

(function () {
    'use strict';

    home.Views.App = Backbone.View.extend({

        tagName: 'div',

        id: '',

        className: 'home-App',

        events: {},

        initialize: function () {
            var self = this;

            this.$el.appendTo(home.rootElement);
//            this.loadingScreen = new home.Views.Loading(this.$el);

            window.setTimeout(function() {


                var l = new home.Models.Light({
                    url: "/api/light"
                });

                var vl = new home.Views.Light({
                    model: l
                });

                l.fetch();

                var tp = new home.Models.Temperature({
                    url: "/api/temp/pool"
                });

                var vtp = new home.Views.Temperature({
                    model: tp
                });

                tp.fetch();

                var tg = new home.Models.Temperature({
                    url: "/api/temp/garage"
                });

                var vtg = new home.Views.Temperature({
                    model: tg
                });

                tg.fetch({
                    success: function(data) {
//                        self.loadingScreen.remove();
                    }
                });

                $(home.rootElement).append(vl.render());
                $(home.rootElement).append(vtp.render());
                $(home.rootElement).append(vtg.render());
            }, 100);



        }



    });

})();
