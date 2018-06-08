var mongoose = require('mongoose')

var Schema = mongoose.Schema
var AddressSchema = new Schema({
    userid: {type: String, required: true},
    realname: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    province_id: {type: Number, required: true},
    province: {type: String, required: true},
    city_id: {type: Number, required: true},
    city: {type: String, required: true},
    area_id: Number,
    area: String,
    is_default: String,
})

module.exports = AddressSchema