var {handleResponse, OperateType} = require('../../../common/http/hander.response')
var DBHelper = require('../../../common/util/dbhelper')
var BaseController = require('../../base')

module.exports = {
    init: function (app, auth, apigroup) {
        var base = new BaseController(app.models);
        app.post(apigroup + '/product/create', base.create);
        app.post(apigroup + '/product/edit', base.edit);
        app.route(apigroup + '/product/remove').all(base.remove);
        app.route(apigroup + '/product/query').all(base.query);
    },
}