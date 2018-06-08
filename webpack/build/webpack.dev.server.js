var webpack = require('webpack')
const moduleConfig = require("../config/loaders")
const pluginConfig = require("../config/plugins")
const outputConfig = require('../config/output')
var { allEntry } = require("../../src/entries/index")
var allEntryConfig = allEntry()

module.exports = {
    devtool: 'eval', // 构建快：eval 调试使用， 构建慢：source-map 生产使用
    entry: allEntryConfig,
    output: outputConfig,
    module: moduleConfig,

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ].concat(pluginConfig),
    devServer: {             // 设置代理解决跨域问题
        contentBase: 'dist', //默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
        historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        compress: true,   // 开启gzip压缩
        hot: true,
        host: '0.0.0.0',  // 同一局域网段下，可以通过IP (192.168.X.X:8000) 访问
        inline: true, //设置为true，当源文件改变时会自动刷新页面
        port: 8002, //设置默认监听端口，如果省略，默认为"8080"
        proxy: {
            '/': {
                target: 'http://localhost:8000/',
                secure: false,
                withCredentials: true
            }
        }
    }
}