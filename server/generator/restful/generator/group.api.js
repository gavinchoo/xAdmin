var {handleResponse, OperateType} = require('../../../common/http/hander.response')
var DBHelper = require('../../../common/util/dbhelper')
var GroupDb = require('../../db/index').Group

module.exports = {
    init: function (app, auth, apigroup) {
        app.post(apigroup + '/group/create', this.create);
        app.post(apigroup + '/group/edit', this.edit);
        app.route(apigroup + '/group/remove').all(this.remove);
        app.route(apigroup + '/group/query').all(this.query);
    },

    create: function (req, res) {
        GroupDb.create(req.body, function (err, result) {
            handleResponse(OperateType.Create, res, err, result);
        })
    },

    edit: function (req, res) {
        GroupDb.update({_id: req.body._id}, {$set: req.body}, function (err, result) {
            handleResponse(OperateType.Edit, res, err, result);
        })
    },

    remove: function (req, res) {
        var originalParams = req.method == "GET" ? req.query : req.body;
        GroupDb.remove({_id: originalParams._id}, function (err, result) {
            handleResponse(OperateType.Remove, res, err, result);
        })
    },

    query: function (req, res) {
        var originalParams = req.method == "GET" ? req.query : req.body;
        var page = originalParams.page
        var pagesize = originalParams.pagesize
        var params = JSON.parse(JSON.stringify(originalParams))
        delete  params.page
        delete  params.pagesize
        DBHelper.pageQuery(page, pagesize, GroupDb, '', params, {}, function (err, result) {
            handleResponse(OperateType.Query, res, err, result);
        })
    }
}