/**
 * Error handler module
 */
define("error", ["jquery"], function($) {
    var config, view;

    return {
        init: function(env) {
            config = env.config;
            view = env.view;
        },
        display: function(message) {
            view.hideLoader();
            return $('.'+config.view.widgetContainer+' .dotpay-widget-error').html(message).show();
        },
        reset: function() {
            return $('.'+config.view.widgetContainer+' .dotpay-widget-error').html('').hide();
        }
    };
});