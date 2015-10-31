/*global screens, context, Backbone*/

(function () {

    // uuid rfc4122 v4
    home.util.guid = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x7|0x8)).toString(16);
        });
        return uuid;
    };

    home.util.notValue = function(v) {
        if( !v || v == "0" ) {
            return "1";
        } else {
            return "0";
        }
    };

    // The Template Loader. Used to asynchronously load templates located in separate .html files
    home.util.loadTemplates = function(views, callback) {
        var deferreds = [];

        $.each(views, function(index, view) {
            if (home.Views[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    home.Views[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                console.log(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    };

    home.util.initializeModelViews = function(domElement) {
        $(domElement).find("[class|='home']").each(function(index, item) {

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

})();
