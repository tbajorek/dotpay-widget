/**
 * Error handler module
 */
define("error", ["jquery"], function($) {
    var config;

    return {
        init: function(env) {
            config = env.config;
        },
        display: function(message) {
            return $('.'+config.view.widgetContainer+' .dotpay-widget-error').html(message).show();
        },
        reset: function() {
            return $('.'+config.view.widgetContainer+' .dotpay-widget-error').html('').hide();
        }
    };
});