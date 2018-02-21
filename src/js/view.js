/**
 * View services (eg. rendering DOM) module
 */
define("view", ["jquery"], function($) {
    var config, channels, selected = null;
    var widgetContainer = null, loaded = 0;
    function onHideLoader() {
        widgetContainer.find('.dotpay-loader').fadeIn(500, function(){
            $(this).remove();
        });
        widgetContainer.find('.dotpay-channels-container').fadeIn(500);
    }
    function loadImage() {
        ++loaded;
        if(loaded == channels.length) {
            onHideLoader();
        }
    }
    function renderOneChannel(channel, key) {
        // channel container
        var channelContainer = $(document.createElement('div')).addClass(config.view.channelContainer).attr('data-key', key);
        //inactive channel
        if(config.request.disabled !== 'display' && channel.is_disable === true) {
            channelContainer.addClass('inactive');
            if(typeof channel.disable_message !== 'undefined' && config.view.information) {
                var information = $(document.createElement('span')).addClass('dotpay-information').html(channel.disable_message);
                channelContainer.append(information);
            }
        } else if(channel.is_not_online === true) {
            channelContainer.addClass('inactive');
            if(typeof channel.not_online_message !== 'undefined' && config.view.information) {
                var information = $(document.createElement('span')).addClass('dotpay-information').html(channel.not_online_message);
                channelContainer.append(information);
            }
        }
        //channel logo
        var logo = $(document.createElement('img')).on('load', loadImage).attr('src', channel.logo);
        var logoContainer = $(document.createElement('div')).addClass('dotpay-logo-container').append(logo);
        channelContainer.append(logoContainer);
        //channel body
        var bodyContainer = $(document.createElement('div')).addClass('dotpay-body-container');
        var input = $(document.createElement('input')).attr('type', 'radio').attr('name', 'channel').attr('id', 'dotpay-channel-'+channel.id).val(channel.id);
        bodyContainer.append(input);
        var label = $(document.createElement('label')).html(channel.name);
        bodyContainer.append(label);
        channelContainer.append(bodyContainer);
        return channelContainer;
    }
    function renderChannels(channels) {
        var container = $(document.createElement('div')).addClass('dotpay-channels-container');
        for(var key in channels) {
            container.append(renderOneChannel(channels[key], key));
        }
        return container;
    }
    function onOver(e) {
        e.preventDefault();
        $(e.currentTarget).find('.dotpay-information').show();
    }
    function onOut(e) {
        e.preventDefault();
        $(e.currentTarget).find('.dotpay-information').hide();
    }
    function onChosenToggle(e) {
        var objects = $('.'+config.view.channelContainer).not('.dotpay-main-chosen');
        if(config.view.toggleStyle === 'fade') {
            objects.fadeToggle();
        } else {
            objects.slideToggle();
        }
    }
    function copyChannelContainer(originalContainer) {
        var container = $(originalContainer).clone();
        container.find('.dotpay-information').remove();
        container.removeClass('inactive');
        container.addClass('dotpay-main-chosen');
        container.on('click', onChosenToggle);
        return container;
    }
    function onClick(e) {
        e.preventDefault();
        widgetContainer.find('.'+config.view.channelContainer).removeClass('selected');
        $(e.currentTarget).addClass('selected').find('input').prop('checked', true);
        selected = e.channel = channels[parseInt($(e.currentTarget).attr('data-key'))];
        $('.'+config.view.chosenContainer).html('').append(copyChannelContainer(e.currentTarget));
        onChosenToggle(e);
        config.event.onChoose(e);
    }
    return {
        init: function(env) {
            config = env.config;
            widgetContainer = $('.'+config.view.widgetContainer).html('');
            //append error container
            var errorMessage = $(document.createElement('div')).addClass(config.view.errorContainer);
            widgetContainer.append(errorMessage);
            //append container for chosen channel
            var chosenChannel = $(document.createElement('div')).addClass(config.view.chosenContainer);
            widgetContainer.append(chosenChannel);
            return widgetContainer;
        },
        showLoader: function() {
            var loader = $(document.createElement('div')).addClass('dotpay-loader');
            widgetContainer.append(loader);
        },
        hideLoader: onHideLoader,
        render: function(data) {
            channels = data;
            widgetContainer.append(renderChannels(data));
            widgetContainer.find('.'+config.view.channelContainer).on('click', onClick);
            widgetContainer.find('.'+config.view.channelContainer).on('mouseover', onOver);
            widgetContainer.find('.'+config.view.channelContainer).on('mouseout', onOut);
        },
        getSelected: function() {
            return selected;
        }
    };
});