var fs = require('fs')
var path = require('path')

var util = require('../util')
var config = require('../config')

const postfix = "Schema"
const columnTemplate = "@dataIndex:{type: @type, required: @required, title: '@title'}"
const importTemplate = "var {@model}Schema = require('{@path}')"
const childTemplate = "var {@model}Schema = new Schema({\n{@column}\n})"
const dbexportTemplate = "exports.@model = mongoose.model('@model', require('@path'));"

// 查询数据类型
function isColumnSearch(column) {
    return column.f7 && column.f7.table
}

// 附件数据类型
function isColumnAttachment(column) {
    return column.f7 && column.f7.upload
}

// 分录数据类型
function isColumnEntity(column) {
    return column.type == Array && column.f7 && column.f7.upload == undefined
}

function createColumnsContent(columns) {
    var columnsContent = "";
    columns.forEach((columnItem, index) => {
        var columnType = "";
        if (isColumnEntity(columnItem)) {
            if (columnItem.f7.table) {
                columnType = "[" + util.firstToUpperCase(columnItem.f7.table) + postfix + "]";
            } else {
                columnType = "[" + util.firstToUpperCase(columnItem.dataIndex) + postfix + "]";
            }
        } else if (isColumnAttachment(columnItem)) {
            columnType = "[" + util.firstToUpperCase(columnItem.f7.table) + postfix + "]";
        } else if (isColumnSearch(columnItem)) {
            // 对象类型
            if (columnItem.type == Object) {
                columnType = util.firstToUpperCase(columnItem.f7.table) + postfix;
            } else if (columnItem.type == Array) {
                columnType = "[" + util.firstToUpperCase(columnItem.f7.table) + postfix + "]";
            } else {
                columnType = columnItem.type.name;
            }
        } else {
            columnType = columnItem.type.name;
        }

        var newColumn = columnTemplate
          .replace("@title", columnItem.title)
          .replace("@dataIndex", columnItem.dataIndex)
          .replace("@required", columnItem.required ? columnItem.required : false)
          .replace(/@type/g, columnType)

        if (index == columns.length - 1) {
            columnsContent = columnsContent + "    " + newColumn;
        } else {
            columnsContent = columnsContent + "    " + newColumn + ",\n";
        }
    })
    return columnsContent;
}

function createImportContent(mapItem) {
    var importContent = "";
    mapItem.columns.forEach((columnItem) => {
        if (isColumnSearch(columnItem) || (isColumnEntity(columnItem) && columnItem.f7.table)) {
            // 外部对象类型
            if (columnItem.type == Object || columnItem.type == Array) {
                var importPath = ""
                // 同级业务分组
                if (mapItem.group.dataIndex == columnItem.f7.group) {
                    importPath = "./" + columnItem.f7.table;
                } else {
                    if (columnItem.f7.source == "attachment") {
                        importPath = path.relative("/" + config.dbpath + "/" + mapItem.group, '/server/framework/db/mongo/schema/file/file');
                        importPath = importPath.replace(/\\/g, "/");
                    } else {
                        importPath = "../" + columnItem.f7.group + "/" + columnItem.f7.table;
                    }
                }
                var model = util.firstToUpperCase(columnItem.f7.table);
                var importChild = importTemplate
                  .replace(/{@model}/g, model)
                  .replace(/{@path}/g, importPath)
                importContent = importContent + importChild + "\n";
            }
        }
    })
    return importContent;
}

function createChildContent(mapItem) {
    var childContent = "";
    mapItem.columns.forEach((columnItem) => {
        if (isColumnEntity(columnItem) && columnItem.f7.table == undefined) {
            var model = util.firstToUpperCase(columnItem.dataIndex);
            var columnContent = createColumnsContent(columnItem.f7.columns);
            var tableContent = childTemplate
              .replace(/{@model}/g, model)
              .replace(/{@column}/g, columnContent)
              .replace(/{@import}/g, "")
              .replace(/{@child}/g, "")
            childContent = childContent + tableContent
        }
    })
    return childContent;
}

function processDB(map) {
    var dbexportContent = "";
    map.forEach((mapItem) => {

        var model = util.firstToUpperCase(mapItem.table.dataIndex);
        var columnContent = createColumnsContent(mapItem.columns);
        var importContent = createImportContent(mapItem);
        var childContent = createChildContent(mapItem);

        var dbtemplate = fs.readFileSync(path.join(__dirname, "../template/dbtemplate")).toString();
        var tableContent = dbtemplate
          .replace(/{@model}/g, model)
          .replace(/{@column}/g, columnContent)
          .replace(/{@import}/g, importContent)
          .replace(/{@child}/g, childContent)


        var folder = config.dbpath.substring(config.dbpath.lastIndexOf("/"), config.dbpath.length)
        var dbpath = "." + folder + "/" + mapItem.group.dataIndex + "/" + mapItem.table.dataIndex;
        var dbexport = dbexportTemplate
          .replace(/@model/g, model)
          .replace(/@path/g, dbpath)
        dbexportContent = dbexportContent + dbexport + "\n"

        // // 创建文件目录
        var fileRootPath = path.join("./", config.dbpath + "/" + mapItem.group.dataIndex + "/");
        if (!fs.existsSync(fileRootPath)) {
            util.mkdirsSync(fileRootPath);
        }

        var dbPath = fileRootPath + mapItem.table.dataIndex + ".js";
        if (!fs.existsSync(dbPath)) {
            fs.writeFileSync(dbPath, tableContent);
        }
    })

    var dbindextemplate = fs.readFileSync(path.join(__dirname, "../template/dbindextemplate")).toString();
    var dbindexContent = dbindextemplate
      .replace(/@db/g, config.dbconfig.db)
      .replace(/@export/g, dbexportContent)

    var rootPath = path.join("./", config.dbpath.substring(0, config.dbpath.lastIndexOf("/") + 1));
    var dbPath = rootPath + "index.js";
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, dbindexContent);
    }

}

module.exports = {
    processDB: processDB
}