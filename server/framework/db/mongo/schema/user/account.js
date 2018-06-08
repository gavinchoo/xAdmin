var mongoose = require('mongoose')

var Schema = mongoose.Schema
var AccountSchema = new Schema({
    userid: String,
    nickname: String,
    avatar_url: String,
    sex: String,
})

AccountSchema.statics.editAvatar = function (userid, avatar_url, callback) {
    if (!userid || userid.length == 0) {
        return callback(null, [])
    }
    this.update({'userid': userid}, {'$set': {avatar_url: avatar_url}}, callback)
}

AccountSchema.statics.editAccountInfo = function (userid, info, callback) {
    if (!userid || userid.length == 0) {
        return callback(null, [])
    }
    this.update({'userid': userid}, {'$set': info}, callback)
}

AccountSchema.statics.getAccountInfo = function (userid, callback) {
    if (!userid || userid.length == 0) {
        return callback(null, [])
    }
    this.findOne({'userid': userid}, callback)
}

module.exports = AccountSchema