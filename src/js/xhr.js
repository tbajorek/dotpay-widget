/**
 * AJAX provider module
 */
define("xhr", ["jquery"], function($) {
    var config, error, view, data;
    function buildUrl(config) {
        return config.request.host + "?id=" + config.payment.sellerId + "&amount=" + config.payment.amount + "&currency=" + config.payment.currency + "&lang=" + config.payment.lang + "&format=json";
    }
    function call(callback, data, field) {
        if(typeof field === 'undefined') {
            return callback(data);
        } else {
            return callback(data[field]);
        }
    }
    function filterHiddenChannels(data, filter) {
        if(filter !== null && filter.length > 0) {
            var newData = [];
            for(var key in data) {
                if(filter.indexOf(data[key].id)<0) {
                    newData[newData.length] = data[key];
                }
            }
            data = newData;
        }
        return data;
    }
    function filterDisabled(data, filter) {
        if(filter === 'hide') {
            var newData = [];
            for(var key in data) {
                if(data[key].is_disable !== 'True') {
                    newData[newData.length] = data[key];
                }
            }
            data = newData;
        }
        return data;
    }
    function filterGroups(data, filter) {
        if(filter !== null && filter.length > 0) {
            var newData = [];
            for(var key in data) {
                if(filter.indexOf(data[key].group)>=0) {
                    newData[newData.length] = data[key];
                }
            }
            data = newData;
        }
        return data;
    }
    return {
        init: function(env) {
            config = env.config;
            error = env.error;
            view = env.view;
        },
        callForData: function(callback, field) {
            $.getJSON(buildUrl(config)).done(function(d){
                data = d;
                if(field === 'channels') {
                    data.channels = filterHiddenChannels(
                        filterGroups(
                            filterDisabled(
                                data.channels,
                                config.request.disabled
                            ),
                            config.request.groups
                        ),
                        config.request.hiddenChannels
                    );
                }
                config.event.onLoad(data);
                view.hideLoader();
                call(callback, data, field);
            }).fail(function(jqxhr, status, e) {
                error.display("Request to server failed: " + status + " " + e);
            });
        },
        callForChannels: function(callback) {
            this.callForData(callback, 'channels');
        },
        getData: function() {
            return data;
        }
    };
});