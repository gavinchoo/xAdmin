var mongoose = require('mongoose')

var Schema = mongoose.Schema
var AreaSchema = new Schema({
    id: {type: String},
    fullname: {type: String},
    location: {lat: Number, lng: Number},
})

module.exports = AreaSchema