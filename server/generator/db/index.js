var mongoose = require('mongoose');
const config = {
    db: 'mongodb://localhost:27017/generator',
};
var connection = mongoose.createConnection(config.db);
/**
 * 连接成功
 */
connection.on('connected', function () {
    console.info('Mongoose connection open to ' + config.db);
});

/**
 * 连接异常
 */
connection.on('error', function (err) {
    console.info('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
connection.on('disconnected', function () {
    console.info('Mongoose connection disconnected');
});

exports.Table = connection.model('Table', require('./table'))
exports.Project = connection.model('Project', require('./project'))
exports.Category = connection.model('Category', require('./category'))
exports.Group = connection.model('Group', require('./group'))