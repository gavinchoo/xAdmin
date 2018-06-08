var mongoose = require('mongoose')
var Schema = mongoose.Schema
var CategorySchema = require('../category/category')
var SupplySchema = require('./supply')


var ProductSchema = new Schema({
    title:{type: String, required: true, title: '名称'},
    category:{type: CategorySchema, required: true, title: '分类'},
    supply:{type: SupplySchema, required: true, title: '供应商'}
})

module.exports = ProductSchema