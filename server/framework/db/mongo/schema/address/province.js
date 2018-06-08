var mongoose = require('mongoose')

var Schema = mongoose.Schema
var ProvinceSchema = new Schema({
    id: {type: String},
    name: {type: String},
    fullname: {type: String},
    pinyin: [String],
    location: {lat: Number, lng: Number},
    cidx: [Number],
})

module.exports = ProvinceSchema