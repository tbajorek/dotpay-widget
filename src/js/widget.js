require('../css/main.css');

/**
 * Main module provides global visible object dotpayWidget
 */
define('widget', ['jquery', './config', './error', './xhr', './view'], function($, config, e, ajax, v) {
    var env = {
        config: null,
        error: e,
        xhr: ajax,
        view: v,
        registry: {}
    };
    var dotpayWidget = {
        init: function(cfg) {
            if(typeof cfg === 'undefined' && typeof window !== 'undefined' && typeof window.dotpayConfig !== 'undefined') {
                env.config = config(window.dotpayConfig);
            } else {
                env.config = config(cfg);
            }
            var widgetObject = env.view.init(env);
            env.view.showLoader();
            env.error.init(env);
            env.xhr.init(env);
            env.xhr.callForChannels(env.view.render);
            return widgetObject;
        },
        getChannel: function() {
            return env.view.getSelected();
        },
        jQuery: $
    };

    if(typeof window !== 'undefined') {
        window.dotpayWidget = dotpayWidget;
    }

    return dotpayWidget;
});