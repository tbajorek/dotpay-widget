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
    }
};