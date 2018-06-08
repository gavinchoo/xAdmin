var path = require('path')
var nodeModulesPath = path.join(__dirname, '/node_modules');
module.exports = {
    noParse: [
        path.join(nodeModulesPath, '/react/dist/react.min'),
        path.join(nodeModulesPath, '/react-dom/dist/react-dom.min'),
    ],
    loaders: [
        {test: /\.(css|less)$/, loader: 'happypack/loader?id=happybabelstyles'},
        {
            test: /\.scss$/,
            loader: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass-loader?outputStyle=expanded&sourceMap'
        },
        {test: /\.(gif|jpg|png)$/, loader: 'url-loader?limit=8192&name=images/[name].[hash].[ext]'},
        {test: /\.js$/, exclude: /node_modules/, loader: 'happypack/loader?id=happybabeljs'},
        {test: /\.json$/, loader: 'json-loader'},
        {test: /\.(woff|woff2|svg|eot|ttf)$/, loader: 'url-loader?limit=50000&name=fonts/[name].[hash].[ext]'}
    ]
}