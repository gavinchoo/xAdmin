var mongoose = require('mongoose')
var Schema = mongoose.Schema

var GroupSchema = new Schema({
    projectId: {type: String, required: true},
    title: {type: String, required: true},
    dataIndex: {type: String, required: true},
})

module.exports = GroupSchema