var path = require('path')

module.exports = {
    path: path.join(__dirname, '../../public/dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.js'
}