var {handleResponse, OperateType} = require('../../../common/http/hander.response')
var DBHelper = require('../../../common/util/dbhelper')
var BaseController = require('../../base')

module.exports = {
    init: function (app, auth, apigroup) {
        var base = new BaseController(app.models);
        app.post(apigroup + '/category/create', base.create);
        app.post(apigroup + '/category/edit', base.edit);
        app.route(apigroup + '/category/remove').all(base.remove);
        app.route(apigroup + '/category/query').all(base.query);
    },
}