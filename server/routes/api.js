var express = require('express');
var router = express.Router();
var fs = require('fs')
var config = require('../generator/config')
var passport = require('../framework/config/passport.config');
var authenticator = passport.authenticate('bearer', {session: false})

router.options('*', function (req, res, next) {
    next();
});

router.models = []

var initRouters = (function routers(rootPath, requirePath, group) {
    try {
        var list = fs.readdirSync(rootPath)
        for (var i = 0; i < list.length; i++) {
            var state = fs.lstatSync(rootPath + list[i]);
            if (state.isDirectory()) {
                routers(rootPath + list[i] + "/", requirePath, list[i]);
            } else {
                if (group && group.length > 0) {
                    var service = require(requirePath + group + "/" + list[i])
                    service.init && service.init(router, authenticator, "/" + group)
                } else {
                    var service = require(requirePath + list[i])
                    service.init && service.init(router, authenticator, "")
                }
            }
        }
    } catch (e) {
        console.error(e)
    }
})

var initModels = (function models(rootPath, requirePath, group) {
    try {
        var list = fs.readdirSync(rootPath)
        for (var i = 0; i < list.length; i++) {
            var state = fs.lstatSync(rootPath + list[i]);
            if (state.isDirectory()) {
                models(rootPath + list[i] + "/", requirePath, list[i]);
            } else {
                var modelName = firstToUpperCase(list[i].split('.')[0]);
                router.models[list[i].split('.')[0]] = require(requirePath)[modelName];
            }
        }
    } catch (e) {
        console.error(e)
    }
})

function firstToUpperCase(str) {
    str = str.toLowerCase();
    var reg = /\b(\w)|\s(\w)/g; //  \b判断边界\s判断空格
    return str.replace(reg, function (m) {
        return m.toUpperCase()
    });
}

const routePaths = [
    {fsPath: './server/business/restful/', requirePath: '../business/restful/'},
    {fsPath: './server/generator/restful/', requirePath: '../generator/restful/'},
    {fsPath: './server/framework/restful/', requirePath: '../framework/restful/'}
]

const modelPaths = [
    {
        fsPath: './' + config.dbpath + "/",
        requirePath: '../../' + config.dbpath.substring(0, config.dbpath.lastIndexOf("/") + 1) + 'index'
    },
]

modelPaths.forEach((item) => {
    initModels(item.fsPath, item.requirePath, "");
})

routePaths.forEach((item) => {
    initRouters(item.fsPath, item.requirePath, "");
})

module.exports = router