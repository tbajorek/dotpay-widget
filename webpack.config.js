var webpack = require("webpack");
var fs = require("fs");

module.exports = {
    entry: './src/js/widget.js',
    output: {
        filename: 'dist/widget.js'
    },
    module: {
        loaders: [
            {
                test: /\.css/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(fs.readFileSync('./LICENSE', 'utf8')),
    ]
};