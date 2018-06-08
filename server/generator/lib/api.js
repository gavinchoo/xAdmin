var fs = require('fs')
var path = require('path')
var config = require('../config')
var util = require('../util')

const PATH_TEMPLATE = path.join(__dirname, "../template/apitemplate");
const PATH_API = config.apipath + config.apiversion;
const postfix = ".api.js"

function processApi(map) {
    var template = fs.readFileSync(PATH_TEMPLATE).toString();
    map.forEach((item) => {
        if (item.table.dataIndex.indexOf("child") == -1) {
            var schemaName = item.table.dataIndex;
            var model = util.firstToUpperCase(schemaName);
            var subPath = schemaName.toLowerCase();

            var dbpath = config.dbpath.substring(0, config.dbpath.lastIndexOf("/"));
            if (config.apiversion && config.apiversion.length > 0){
                dbpath = "../" + dbpath;
            }
            var content = template
              .replace(/{@Model}/g, model)
              .replace(/{@Path}/g, subPath)
              .replace(/{@Dbpath}/g, dbpath);
            // 创建文件目录
            var fileRootPath = path.join("./", PATH_API);
            if (!fs.existsSync(fileRootPath)) {
                fs.mkdirSync(fileRootPath);
            }

            var fileFullPath = path.join("./", PATH_API + "/" + subPath + postfix);
            // 已生成的接口需手动删除， 防止修改后被覆盖
            if (!fs.existsSync(fileFullPath)) {
                fs.writeFileSync(fileFullPath, content);
            }
        }
    })
}

module.exports = {
    processApi: processApi
}