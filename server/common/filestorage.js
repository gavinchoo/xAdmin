var multer = require('multer')
var config = require('../constant/config')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
var multer = multer({ storage: storage })
var upload = multer.single('file')

module.exports = upload