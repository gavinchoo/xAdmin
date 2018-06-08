var mongoose = require('mongoose')

var Schema = mongoose.Schema

var ColumnsSchema = new Schema({
    title: {type: String, required: true},
    dataIndex: {type: String, required: true},
    value: {type: String, required: true},
})

var CategorySchema = new Schema({
    projectId: {type: String, required: true},
    title: {type: String, required: true},
    dataIndex: {type: String, required: true},
    subitems: {type: [ColumnsSchema]},
})

module.exports = CategorySchema