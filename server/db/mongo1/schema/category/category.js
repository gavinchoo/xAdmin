var mongoose = require('mongoose')
var Schema = mongoose.Schema

var SubitemsSchema = new Schema({
    dataIndex:{type: String, required: true, title: '枚举名称'},
    title:{type: String, required: true, title: '枚举别名'},
    value:{type: String, required: true, title: '枚举值'}
})
var CategorySchema = new Schema({
    dataIndex:{type: String, required: true, title: '枚举名称'},
    title:{type: String, required: true, title: '枚举别名'},
    subitems:{type: [SubitemsSchema], required: false, title: '枚举项'}
})

module.exports = CategorySchema