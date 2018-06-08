var mongoose = require('mongoose')

var Schema = mongoose.Schema
var CitySchema = new Schema({
    id: {type: String},
    name: {type: String},
    fullname: {type: String},
    pinyin: [String],
    location: {lat: Number, lng: Number},
})

CitySchema.statics.findByProvinceId = function (province_id, callback) {
    var index = province_id.substring(0, 2)
    this.find({id: {$regex: `^${index}`}}).sort({id: 1}).exec(callback)
}

module.exports = CitySchema

