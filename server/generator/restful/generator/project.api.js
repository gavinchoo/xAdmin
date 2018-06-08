var {handleResponse, OperateType} = require('../../../common/http/hander.response')
var DBHelper = require('../../../common/util/dbhelper')
var ProjectDb = require('../../db/index').Project
var TableDb = require('../../db/index').Table

var processApi = require('../../lib/api')
var processUi = require('../../lib/ui')
var processDb = require('../../lib/db')


const CategoryModel = {
    table: {
        title: "分类",
        dataIndex: "category",
        addNew: {title: "新增", isMenu: false}
    },
    group: {title: "分类管理", dataIndex: "category"},
    columns: [
        {
            title: '枚举名称',
            dataIndex: 'dataIndex',
            key: 'dataIndex',
            type: String,
            required: true,
        },
        {
            title: '枚举别名',
            dataIndex: 'title',
            key: 'title',
            type: String,
            required: true,
        },
        {
            title: '枚举项',
            dataIndex: 'subitems',
            key: 'subitems',
            type: Array,
            listshow: false,
            required: false,
            f7: {
                "columns": [
                    {
                        "title": "枚举名称",
                        "dataIndex": "dataIndex",
                        "key": "dataIndex",
                        type: String,
                        "required": true,
                        "width": 60
                    },
                    {
                        "title": "枚举别名",
                        "dataIndex": "title",
                        "key": "title",
                        type: String,
                        "required": true,
                        "width": 60
                    },
                    {"title": "枚举值", "dataIndex": "value", "key": "value", type: String, "required": true, "width": 60},
                ]
            },
        },
    ]
}

function formatType(type) {
    if (type == "String") {
        return String;
    } else if (type == "Number") {
        return Number;
    } else if (type == "Boolean") {
        return Boolean;
    } else if (type == "Object") {
        return Object;
    } else if (type == "Array") {
        return Array;
    }
}

module.exports = {
    init: function (app, auth, apigroup) {
        app.post(apigroup + '/project/create', this.create);
        app.post(apigroup + '/project/edit', this.edit);
        app.route(apigroup + '/project/remove').all(this.remove);
        app.route(apigroup + '/project/query').all(this.query);
        app.route(apigroup + '/project/export').all(this.export);
    },

    export: function (req, res) {
        var originalParams = req.method == "GET" ? req.query : req.body;

        TableDb.find(originalParams, function (err, result) {

            var map = result.map((tableItem) => {
                var modelItem = {
                    table: {
                        title: tableItem.title,
                        dataIndex: tableItem.dataIndex,
                        addNew: {title: "新增", isMenu: false}
                    },
                    group: {title: tableItem.group.title, dataIndex: tableItem.group.dataIndex}
                }

                var columns = tableItem.columns.map((columnItem) => {
                    var tempItem = {
                        "title": columnItem.title,
                        "dataIndex": columnItem.dataIndex,
                        "type": formatType(columnItem.type),
                        "listshow": columnItem.listshow,
                        "required": columnItem.required,
                    }
                    if (columnItem.source.value == "input") {
                        return tempItem;
                    } else if (columnItem.source.value == "category") {
                        var f7 = {
                            source: columnItem.source.value,
                            table: "category",
                            group: "category",
                            value: columnItem.category.dataIndex,
                            columns: [{
                                title: "枚举别名",
                                dataIndex: "title",
                                key: "title",
                                type: String,
                                required: true,
                                width: 60
                            },
                                {
                                    title: "枚举名称",
                                    dataIndex: "dataIndex",
                                    key: "dataIndex",
                                    type: String,
                                    required: true,
                                    width: 60
                                }],
                            showFiled: columnItem.showFiled ? columnItem.showFiled : "title"
                        }
                        tempItem["f7"] = f7;
                    } else if (columnItem.source.value == "other_busi") {
                        var f7 = {
                            source: columnItem.source.value,
                            table: columnItem.table.dataIndex,
                            group: columnItem.table.group.dataIndex,
                            columns: columnItem.table.columns,
                            showFiled: columnItem.showFiled ? columnItem.showFiled : "title"
                        }
                        tempItem["f7"] = f7;
                    } else if (columnItem.source.value == "attachment") {

                    } else if (columnItem.source.value == "entity") {

                    }

                    return tempItem;
                })

                modelItem["columns"] = columns;
                return modelItem;
            });

            map.push(CategoryModel);

            processDb.processDB(map);
            processApi.processApi(map);
            processUi.processUi(map);
            processUi.processMenu(map);


            handleResponse(OperateType.Create, res, err, result);
        })
    },

    create: function (req, res) {
        ProjectDb.create(req.body, function (err, result) {
            handleResponse(OperateType.Create, res, err, result);
        })
    },

    edit: function (req, res) {
        ProjectDb.update({_id: req.body._id}, {$set: req.body}, function (err, result) {
            handleResponse(OperateType.Edit, res, err, result);
        })
    },

    remove: function (req, res) {
        var originalParams = req.method == "GET" ? req.query : req.body;
        ProjectDb.remove({_id: originalParams._id}, function (err, result) {
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
        DBHelper.pageQuery(page, pagesize, ProjectDb, '', params, {}, function (err, result) {
            handleResponse(OperateType.Query, res, err, result);
        })
    }
}