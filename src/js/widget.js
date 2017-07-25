require('../css/main.css');

define('widget', ['jquery', './config', './error', './xhr', './view'], function($, config, e, ajax, v) {
    var env = {
        config: null,
        error: e,
        xhr: ajax,
        view: v,
        registry: {}
    };
    window.dotpayWidget = {
        init: function(cfg) {
            env.config = config(cfg);
            env.view.init(env);
            env.error.init(env);
            env.xhr.init(env);
            env.view.showLoader();
            env.xhr.callForChannels(env.view.render);
        },
        getChannel: function() {
            return env.view.getSelected();
        }
    }
});