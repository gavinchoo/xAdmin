var mongoose = require('mongoose')

var Schema = mongoose.Schema

var ProjectSchema = new Schema({
    projectName: {type: String, required: true},
    apiVersion: {type: String, required: true},
    dbName: {type: String, required: true},
})

module.exports = ProjectSchema