/*global home, context, Backbone*/

(function () {
    'use strict';

    home.Views.App = Backbone.View.extend({

        initialize: function () {
            var body = $(document.body);
            body.find("[class|='home']").each(function(index, item) {

                var $item = $(item);

                //assuming there is only one for now
                var css = $item.attr("class");
                var s = css ? css.split("-") : [];
                var name = s.length > 1 ? s[1] : null;

                if( name && home.Models[name] && home.Views[name]) {
                    var config = $item.data("config");
                    var model = new home.Models[name](config);

                    var view = new home.Views[name]({
                        model: model
                    });

                    model.fetch({
                        success: function() {
                            $item.before(view.render());
                            $item.remove();
                        },
                        error: function() {
                            $item.before(view.render());
                            $item.remove();
                        }
                    });
                }
            });
        }

    });

})();
