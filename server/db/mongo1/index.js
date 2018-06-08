var mongoose = require('mongoose');
const config = {
    db: 'mongodb://localhost:27017/mall_jzb',
};
mongoose.connect(config.db);
/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.info('Mongoose connection open to ' + config.db);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
    console.info('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.info('Mongoose connection disconnected');
});

exports.Product = mongoose.model('Product', require('./schema/productmanage/product'));
exports.Supply = mongoose.model('Supply', require('./schema/productmanage/supply'));
exports.Category = mongoose.model('Category', require('./schema/category/category'));
