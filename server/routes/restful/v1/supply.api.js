var {handleResponse, OperateType} = require('../../../common/http/hander.response')
var DBHelper = require('../../../common/util/dbhelper')
var BaseController = require('../../base')

module.exports = {
    init: function (app, auth, apigroup) {
        var base = new BaseController(app.models);
        app.post(apigroup + '/supply/create', base.create);
        app.post(apigroup + '/supply/edit', base.edit);
        app.route(apigroup + '/supply/remove').all(base.remove);
        app.route(apigroup + '/supply/query').all(base.query);
    },
}