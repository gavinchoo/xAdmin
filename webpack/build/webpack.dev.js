var webpack = require('webpack')

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
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
        new BundleAnalyzerPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ].concat(pluginConfig),
}