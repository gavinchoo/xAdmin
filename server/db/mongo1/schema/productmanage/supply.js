var mongoose = require('mongoose')
var Schema = mongoose.Schema


var SupplySchema = new Schema({
    number:{type: String, required: true, title: '编号'},
    title:{type: String, required: true, title: '供应商名称'}
})

module.exports = SupplySchema