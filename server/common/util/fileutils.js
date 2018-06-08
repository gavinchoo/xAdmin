var path = require('path')
var fs = require('fs')
//同步创建目录
/**
 * @param [in] dirpath 要创建的目录,支持多层级创建
 */
exports.mkdirsSync = function (dirpath, mode) {
    try {
        if (!fs.existsSync(dirpath)) {
            let pathtmp;
            dirpath.split(/[/\\]/).forEach(function (dirname) {  //这里指用/ 或\ 都可以分隔目录  如  linux的/usr/local/services   和windows的 d:\temp\aaaa
                if (pathtmp) {
                    pathtmp = path.join(pathtmp, dirname);
                }
                else {
                    pathtmp = dirname;
                }
                if (!fs.existsSync(pathtmp)) {
                    if (!fs.mkdirSync(pathtmp, mode)) {
                        return false;
                    }
                }
            });
        }
        return true;
    } catch (e) {
        console.log("create director fail! path=" + dirpath + " errorMsg:" + e);
        return false;
    }
}

//同步删除指定目录下的所前目录和文件,包括当前目录
exports.rmdirsSync = function (targetPath) {
    try {
        let files = [];
        if (fs.existsSync(targetPath)) {
            files = fs.readdirSync(targetPath);
            files.forEach(function (file, index) {
                let curPath = targetPath + "/" + file;
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    if (!rmdirsSync(curPath)) return false;
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(targetPath);
        }
    } catch (e) {
        console.log("remove director fail! path=" + targetPath + " errorMsg:" + e);
        return false;
    }
    return true;
}