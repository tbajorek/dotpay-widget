Dotpay widget
===================
[![npm version](https://badge.fury.io/js/dotpay_widget.svg)](https://badge.fury.io/js/dotpay_widget)

This is unofficial interactive widget which allows you to choose payment channel in user-friendly way if you use [Dotpay payments](http://dotpay.pl) in your shop. You can you as much widgets on one page as you want. This widget allows you also to register your own event handler on choose payment channel.

Installation
-------------
You can [download](https://github.com/tbajorek/dotpay-widget/releases/latest) the latest version or [clone](https://github.com/tbajorek/dotpay-widget) the repository:
```
git clone https://github.com/tbajorek/dotpay-widget.git
```
You can compile the project using npm and [webpack](https://webpack.js.org):
```
npm install
npm start
```
You can copy later the `widget.js` file to your expected destnation.

Usage
-------------

At first you have to include script with Dotpay widget:
```
<script type="text/javascript" src="<SCRIPT_FOLDER>/widget.js"></script>
```
where `<SCRIPT_FOLDER>` contains Javascript file `widget.js` with code.

You can use then global object `window.dotpayWidget` with two methods:

 - ```init(configuration)``` - initializes a new widget according to configuration given by the *configuration* variable in parameter; if you don't give there some properties, they will be initialized by default values; returns jQuery object containing widget container in DOM structure;
 - ```getChannel()``` - returns details of selected channel, compatible to structure in data source; if none then it returns null.

If you don't give the `configuration` parameter to `init()` function, it still can use configuration object saved in `window.dotpayConfig` variable.

HTML element with class given in `view.widgetContainer` property has to exist when `window.dotpayWidget.init()` function is executed. For more details look at [Examples](#examples)

When you have chosen a payment channel, all channels slides up. If you want to display them again, you have to click the chosen channel.

### Configuration
This table contains all values you can set in widget configuration.

| Property               | Type     | Description                                                                                                                     | Default value                                  |
|------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| payment.sellerId       | int      | Seller id from Dotpay panel                                                                                                     | null                                           |
| payment.amount         | double   | Amount of money                                                                                                                 | 1000.00                                        |
| payment.currency       | string   | Code of currency                                                                                                                | `PLN`                                          |
| payment.lang           | string   | Code of language                                                                                                                | `pl`                                           |
| request.host           | string   | Host of request where is available data with payment channels                                                                   | *see more [details](#location-of-data-source)* |
| request.test           | boolean  | Flag if test mode is used                                                                                                       | false                                          |
| request.disabled       | string   | Value which informs how mode of displaying disabled channels is active (*see more [details](#displaying-of-disabled-channels)*) | `mark`                                         |
| request.hiddenChannels | array    | Array of channel numbers which will not be displayed. This feature doesn't depend on data from server                           | null                                           |
| request.groups         | array    | Array of channel group ids which are displayed. If none is specified, channels from all groups will be displayed.               | null                                           |
| view.widgetContainer   | string   | Class name of widget container                                                                                                  | `dotpay-widget-container`                      |
| view.channelContainer  | string   | Class name of single channel container                                                                                          | `dotpay-channel`                               |
| view.errorContainer    | string   | Class name of error container                                                                                                   | `dotpay-widget-error`                          |
| view.chosenContainer   | string   | Class name of container for chosen channel                                                                                      | `dotpay-chosen-container`                      |
| view.toggleStyle       | string   | Name of style how should be toggle channels (available values: `fade` or `slide`)                                               | `fade`                                         |
| view.information       | boolean  | Flag if message information should be displayed in channel                                                                      | true                                           |
| event.onLoad           | function | Handler of 'load widget' event (*see more [details](#events)*)                                                                  | *empty function*                               |
| event.onChoose         | function | Handler of 'select channel' event (*see more [details](#events)*)                                                               | *empty function*                               |


#### Location of data source
Dotpay offers to have a test account where you can make fake payments to test your integration before switch it to production mode. Widget uses different location of data source:

 - test mode: `https://ssl.dotpay.pl/test_payment/payment_api/v1/channels/`
 - production mode: `https://ssl.dotpay.pl/t2/payment_api/v1/channels/`

You can use own data source. It requires to have available JSON data which format is compatible with used by Dotpay.

#### Displaying of disabled channels

 Some channels can be marked in data source as disabled. You can decide how to display those channels. Here are available three ways:

 - `display` - disabled channel is displayed like other normal channels;
 - `mark` - disabled channel is displayed but marked as disable channel;
 - `hide` - disabled channel isn't displayed.

##### Handlers
Widget allows to use two handlers. They are functions which get one parameter. Handlers handles following events:

 - `onLoad` - widget has been loaded successfully; parameter contains data of all channels loaded from data source; the structure is the same as in the source;
 - `onChoose` - payment channel has been chosen by user; parameter contains jQuery event details; additional property is `e.channel` where is located data of selected channel with information compatible with data source (this is when `e` is the name of handler parameter).

Examples
-------------

#### Full simple code
```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Dotpay Widget</title>
        <script src="../dist/widget.js"></script>
        <script>
	    //configuration and initialization of widget
        </script>
    </head>
    <body>
        <div class="dotpay-widget-container"></div>
    </body>
</html>
```
-------------
#### Basic configuration
```
var dotpayConfig = {
	payment: {
		sellerId: 999999,
		amount: 159.47,
		currency: 'USD',
		lang: 'en'
	}
};
window.dotpayWidget.init(dotpayConfig);
```

License
-------------
MIT, see LICENSE file.