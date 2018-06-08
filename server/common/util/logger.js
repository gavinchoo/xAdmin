var config = require('../../constant/config');
var pathLib = require('path')

var env = process.env.NODE_ENV || "development"
var log4js = require('log4js');

log4js.configure({
    appenders: {
        console:{
            type:'console'
        },
        cheese: {
            type: 'dateFile',
            filename: config.apilogDir,
            alwaysIncludePattern: true,
            pattern: "/yyyyMMdd.log",
        }
    },
    categories: {
        default: {appenders: ['cheese', 'console'], level: config.debug && env !== 'test' ? 'DEBUG' : 'ERROR'}
    }
});

var logger = log4js.getLogger('cheese');
module.exports = logger;
