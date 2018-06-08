var mongoose = require('mongoose')

var Schema = mongoose.Schema
var UserSchema = new Schema({
    username: String,
    pwd: String,
    token: String,
    createtime: {type:Date, default: Date.now},
})

UserSchema.statics.getUserByLoginName = function (username, callback) {
    if (!username || username.length == 0) {
        return callback(null, [])
    }
    this.findOne({'username': username}, callback)
}

UserSchema.statics.updateToken = function (username, token, callback) {
    this.update({'username': username}, {'$set': {'token': token}}, callback)
}

module.exports = UserSchema