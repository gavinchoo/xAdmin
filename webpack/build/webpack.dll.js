var os = require('os')
var path = require("path");
var webpack = require("webpack");
var CompressionPlugin = require("compression-webpack-plugin")
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
var HappyPack = require('happypack');
var HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const moduleConfig = require("../config/loaders")

module.exports = {
    devtool: 'source-map', // 构建快：eval 调试使用， 构建慢：source-map 生产使用
    entry: {
        vendor: ['react', 'react-dom', 'react-router-dom', 'moment'],
    },
    output: {
        path: path.join(__dirname, '../../public/dist/dll'), // 打包后文件输出的位置
        publicPath: '/dist/dll/',
        filename: '[name].bundle.js',
        library: '[name]_library'
        // vendor.dll.js中暴露出的全局变量名。
        // 主要是给DllPlugin中的name使用，
        // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
    },
    module: moduleConfig,
    plugins: [
        new UglifyJSPlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, '../json', '[name]-manifest.json'),
            name: '[name]_library',
            context: __dirname
        }),
        new AssetsPlugin({
            filename: 'bundle-config.json',
            path: path.join(__dirname, '../json')
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0
        }),
        new HappyPack({
            id: 'happybabeljs',
            loaders: ['babel-loader'],
            threadPool: HappyThreadPool,
        }),
        new HappyPack({
            id: 'happybabelstyles',
            threadPool: HappyThreadPool,
            loaders: [ 'style-loader', 'css-loader', 'less-loader' ]
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
};