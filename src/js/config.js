/**
 * Config reader module
 */
define('config', ['jquery'], function($) {
    function getDefaultConfig() {
        return {
            payment: {
                sellerId: null,
                amount: 1000.00,
                currency: 'PLN',
                lang: 'pl'
            },
            request: {
                host: null,
                test: false,
                disabled: 'mark',
                hiddenChannels: [],
                groups: null
            },
            view: {
                widgetContainer: 'dotpay-widget-container',
                channelContainer: 'dotpay-channel',
                errorContainer: 'dotpay-widget-error',
                chosenContainer: 'dotpay-chosen-container',
                toggleStyle: 'fade',
                information: true
            },
            event: {
                onLoad: function(e){},
                onChoose: function(e){}
            }
        };
    }

    return function(config) {
        var defaultConfig = getDefaultConfig();
        if(typeof config !== 'undefined') {
            $.extend(true, defaultConfig, config);
        }
        defaultConfig.payment.sellerId = parseInt(defaultConfig.payment.sellerId);
        defaultConfig.payment.amount = parseFloat(defaultConfig.payment.amount);
        if(defaultConfig.request.host === null) {
            defaultConfig.request.test = Boolean(defaultConfig.request.test);
            if(defaultConfig.request.test) {
                defaultConfig.request.host = 'https://ssl.dotpay.pl/test_payment/payment_api/v1/channels/'
            } else {
                defaultConfig.request.host = 'https://ssl.dotpay.pl/t2/payment_api/v1/channels/'
            }
        }
        return defaultConfig;
    }
});