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

/**
 * 用户
 */
exports.User = mongoose.model('User', require('./schema/user/user'));
exports.Account = mongoose.model('Account', require('./schema/user/account'));

/**
 * 地址
 */
exports.Address = mongoose.model('Address', require('./schema/address/address'))
exports.Province = mongoose.model('Province', require('./schema/address/province'))
exports.City = mongoose.model('City', require('./schema/address/city'))
exports.Area = mongoose.model('Area', require('./schema/address/area'))

/**
 * 文档
 */
exports.File = mongoose.model('File', require('./schema/file/file'))