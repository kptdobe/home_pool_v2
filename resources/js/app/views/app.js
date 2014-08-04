/*global home, context, Backbone*/

(function () {
    'use strict';

    home.Views.App = Backbone.View.extend({

        initialize: function () {
            var body = $(document.body);
            body.find("[class|='view']").each(function(index, item) {

                var $item = $(item);

                //assuming there is only one for now
                var css = $item.attr("class");
                var s = css ? css.split("-") : [];
                var name = s.length > 1 ? s[1] : null;

                console.log("find", $item, css, s, name);

                if( name && home.Models[name] && home.Views[name]) {
                    var config = $item.data("config");
                    var model = new home.Models[name]({
                        url: config.url
                    });

                    var view = new home.Views[name]({
                        model: model
                    });

                    model.fetch();

                    $item.before(view.render());
                    $item.remove();
                }
            });
        }

    });

})();
