var fs = require('fs')
var {handleResponse, OperateType} = require('../../../common/http/hander.response')
var {ResponseError, ResponseSuccess} = require('../../../common/http/response.result')
var FileDb = require('../../db/mongo/index').File
var storage = require('../../../common/filestorage')

module.exports = {
    init: function (app, auth, group) {
        app.post(group + '/file/upload', storage, this.uploadPicture)
        app.get(group + '/file/download', this.downloadPicture)
        app.all(group + '/file/remove', this.removePicture)
        app.all(group + '/file/query', this.queryPicture)
        app.all(group + '/file/bind', this.bindPicture)
    },

    bindPicture: function (req, res) {
        var avatar_id = req.method == "GET" ? req.query.avatar_id : req.body.avatar_id;
        var billid = req.method == "GET" ? req.query.billid : req.body.billid;
        console.log(billid)
        if (billid instanceof Array) {
            billid.forEach((item) => {
                FileDb.update({_id: item}, {$set: {billid: billid}}, function (err, result) {
                    handleResponse(OperateType.Edit, res, err, result);
                })
            })
        }
    },

    queryPicture: function (req, res) {
        var billid = req.method == "GET" ? req.query.billid : req.body.billid;
        console.log(billid)
        FileDb.find({billid: billid}, function (err, result) {
            handleResponse(OperateType.Query, res, err, result);
        })
    },

    removePicture: function (req, res) {
        var avatar_id = req.method == "GET" ? req.query.avatar_id : req.body.avatar_id;
        console.log(avatar_id)
        FileDb.getFile(avatar_id, function (err, result) {
            if (err || result == null) {
                handleResponse(OperateType.Remove, res, err, result);
            } else {
                fs.unlinkSync(result.path);
                FileDb.remove({_id: result._id}, function (err, result) {
                    handleResponse(OperateType.Remove, res, err, result);
                })
            }
        })
    },

    downloadPicture: function (req, res) {
        var avatar_id = req.query.avatar_id
        console.log(avatar_id)
        FileDb.getFile(avatar_id, function (err, result) {
            if (err || result == null) {
                handleResponse(OperateType.Query, res, err, result);
            } else {
                res.download(result.path)
            }
        })
    },

    uploadPicture: function (req, res) {
        var fileInfo = req.file
        console.log(req.file)
        if (fileInfo) {
            var file = {}
            file['originalname'] = fileInfo.originalname
            var index = fileInfo.originalname.lastIndexOf('.')
            file['ext'] = fileInfo.originalname.substring(index + 1, fileInfo.originalname.length)
            file['path'] = fileInfo.path
            file['filename'] = fileInfo.filename
            file['mimetype'] = fileInfo.mimetype
            file['size'] = fileInfo.size
            if (req.user && req.user._doc) {
                file['userid'] = req.user._doc._id
            }
            FileDb.create(file, function (err, result) {
                if (err) {
                    res.status(400).json(new ResponseError('文件上传失败', err.message))
                } else {
                    console.log(result)
                    if (result == null) {
                        res.status(400).json(new ResponseError('文件上传失败'))
                    } else {
                        res.json(new ResponseSuccess('文件上传成功', {file: result}))
                    }
                }
            })
        } else {
            res.status(400).json(new ResponseError('文件上传失败'))
        }
    }
}