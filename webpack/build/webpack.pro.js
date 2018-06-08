var webpack = require('webpack')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const pluginConfig = require("../config/plugins")
const moduleConfig = require("../config/loaders")
const outputConfig = require('../config/output')
var { allEntry } = require("../../src/entries/index")
const allEntryConfig = allEntry()

module.exports = {
    devtool: 'source-map', // 构建快：eval 调试使用， 构建慢：source-map 生产使用
    entry: allEntryConfig,
    output: outputConfig,
    module: moduleConfig,
    plugins: [
        new UglifyJSPlugin(),
        new BundleAnalyzerPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ].concat(pluginConfig),
}