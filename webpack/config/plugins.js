var os = require('os')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
var HappyPack = require('happypack');
var HappyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const bundleConfig = require("../json/bundle-config.json");
const {entryConfig} = require("../../src/entries/index")
const theme = require('../../package.json').theme;

var htmlPlugins = []

for (var key in entryConfig.web){
    htmlPlugins.push(new HtmlWebpackPlugin({
        template: './webpack/template/index.ejs',
        filename: `${key.replace('/', '/assets/')}.ejs`,
        chunks: ['vendor', key],
        bundleName: bundleConfig.vendor.js,
    }))
}

for (var key in entryConfig.mobile){
    htmlPlugins.push(new HtmlWebpackPlugin({
        template: './webpack/template/mobile.ejs',
        filename: `${key.replace('/', '/assets/')}.ejs`,
        chunks: ['vendor', key],
        bundleName: bundleConfig.vendor.js,
    }))
}

htmlPlugins.push(new HtmlWebpackPlugin({
    template: './webpack/template/404.ejs',
    filename: 'common/view/404.ejs',
    chunks: [],
}))
htmlPlugins.push(new HtmlWebpackPlugin({
    template: './webpack/template/error.ejs',
    filename: 'common/view/error.ejs',
    chunks: [],
}))

module.exports = [
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('../json/vendor-manifest.json')
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HappyPack({
        id: 'happybabeljs',
        loaders: ['babel-loader'],
        threadPool: HappyThreadPool,
    }),
    new HappyPack({
        id: 'happybabelstyles',
        threadPool: HappyThreadPool,
        loaders: ['style-loader', 'css-loader', {loader: 'less-loader', options: {javascriptEnabled: true, modifyVars: theme}}]
    }),
    new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0
    }),
].concat(htmlPlugins)