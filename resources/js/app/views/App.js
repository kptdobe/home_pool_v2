/*global home, context, Backbone*/

(function () {
    'use strict';

    home.Views.App = Backbone.View.extend({

        initialize: function () {
            home.util.initializeModelViews(document.body);
        }

    });

})();
