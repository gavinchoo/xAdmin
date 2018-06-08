var path = require('path')
var {mkdirsSync} = require('../common/util/fileutils')

var config = {
    debug: true,
    apilogDir: path.join("./", '/capture/logs/apilog'),
    serverlogDir: path.join("./", '/capture/logs/serverlog'),
    uploadDir: path.join("./", '/capture/uploads'),
    initCaptureDir: function () {
        // ensure log directory exists
        mkdirsSync(this.apilogDir)
        mkdirsSync(this.serverlogDir)
        mkdirsSync(this.uploadDir)
    }
}

module.exports = config