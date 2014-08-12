/*global screens, context, Backbone*/

(function () {
    'use strict';

    home.Models.PersistedData= Backbone.Model.extend({
        urlRoot: "/persist/data",

        idAttribute: "id",

        initialize: function () {}
    });

})();
