var fs = require('fs')
var path = require('path')

var util = require('../util')
var config = require('../config')

const columnTemplate = "{title: '@title', dataIndex: '@dataIndex',key: '@key', type: @type, width: @width, required: @required, f7: @f7, listshow:@listshow}"
const uriTemplate = "query: '@query',\n    remove: '@remove',\n    edit: '@edit',\n    create: '@create'";

const menuItem = "@group: {title: '@title',path: '/@path',icon: 'appstore-o',child: [@child]}";
const menuChild = "{path: '/@path', title: '@title', component: @component, isMenu: @isMenu, editable: @editable}";
const menuImport = "import @model from '@path'"

function createColumnsContent(mapItem) {
    var columnsContent = "";
    mapItem.columns.forEach((columnItem) => {

        if (columnItem.f7 && columnItem.f7.table) {
            columnItem.f7.query = "/api/" + config.apiversion + "/" + columnItem.f7.table + "/query";
        }

        var newColumn = columnTemplate
          .replace("@title", columnItem.title)
          .replace("@dataIndex", columnItem.dataIndex)
          .replace("@key", columnItem.dataIndex)
          .replace(/@type/g, columnItem.type.name)
          .replace(/@f7/g, JSON.stringify(columnItem.f7))
          .replace("@required", columnItem.required)
          .replace("@listshow", columnItem.listshow == false ? false : true)
          .replace("@width", columnItem.width ? columnItem.width : 150);

        columnsContent = columnsContent + "    " + newColumn + ",\n";
    })
    return columnsContent;
}

function createUriContent(mapItem) {
    var api = "/api/" + config.apiversion + "/" + mapItem.table.dataIndex;
    var uriContent = uriTemplate
      .replace(/@query/g, api + "/query")
      .replace(/@remove/g, api + "/remove")
      .replace(/@edit/g, api + "/edit")
      .replace(/@create/g, api + "/create")
    return uriContent;
}

function createMenuImport(groups) {
    var menuImportContent = "";
    for (let key in groups) {
        var groupItem = groups[key];

        groupItem.forEach((childItem) => {
            var model = util.firstToUpperCase(childItem.table.dataIndex)
            var path = "./" + childItem.group.dataIndex + "/" + childItem.table.dataIndex + "list"
            var menuImportChild = menuImport
              .replace(/@model/g, "List" + model)
              .replace(/@path/g, path)
            menuImportContent = menuImportContent + menuImportChild + "\n";

            if (childItem.table.addNew) {
                var path = "./" + childItem.group.dataIndex + "/" + childItem.table.dataIndex + "add"
                var menuImportChild = menuImport
                  .replace(/@model/g, "Add" + model)
                  .replace(/@path/g, path)
                menuImportContent = menuImportContent + menuImportChild + "\n";
            }
        })
    }
    return menuImportContent;
}

function createMenuItem(groups) {
    var menuItemContent = "";
    for (let key in groups) {
        var groupItem = groups[key];
        var menuChildContent = "";

        groupItem.forEach((childItem) => {
            var model = util.firstToUpperCase(childItem.table.dataIndex)
            var newChild = menuChild
              .replace(/@path/g, childItem.table.dataIndex)
              .replace(/@title/g, childItem.table.title)
              .replace(/@isMenu/g, true)
              .replace(/@editable/g, childItem.table.addNew != undefined)
              .replace(/@component/g, "List" + model)
            menuChildContent = menuChildContent + "        " + newChild + ",\n";

            if (childItem.table.addNew) {
                var newChild = menuChild
                  .replace(/@path/g, childItem.table.dataIndex + "_add")
                  .replace(/@title/g, childItem.table.addNew.title)
                  .replace(/@isMenu/g, childItem.table.addNew.isMenu)
                  .replace(/@editable/g, false)
                  .replace(/@component/g, "Add" + model)
                menuChildContent = menuChildContent + "        " + newChild + ",\n";
            }
        })

        var newMenu = menuItem
          .replace(/@group/g, groupItem[0].group.dataIndex)
          .replace(/@title/g, groupItem[0].group.title)
          .replace(/@path/g, groupItem[0].group.dataIndex)
          .replace(/@child/g, "\n" + menuChildContent)

        menuItemContent = menuItemContent + "    " + newMenu + ",\n";
    }
    return menuItemContent;
}

function processMenu(map) {
    var groups = {};
    map.forEach((mapItem) => {
        if (groups[mapItem.group.dataIndex] == undefined) {
            groups[mapItem.group.dataIndex] = [mapItem];
        } else {
            groups[mapItem.group.dataIndex].push(mapItem);
        }
    })

    var menuImportContent = createMenuImport(groups);
    var menuItemContent = createMenuItem(groups);
    var menutemplate = fs.readFileSync(path.join(__dirname, "../template/menutemplate")).toString();

    var menuContent = menutemplate
      .replace(/@route/g, menuItemContent)
      .replace(/@import/g, menuImportContent)
    var menuPath = path.join("./", config.uipath + config.uiname + "menu.js");
    if (!fs.existsSync(menuPath)) {
        fs.writeFileSync(menuPath, menuContent);
    }

    var configtemplate = fs.readFileSync(path.join(__dirname, "../template/configtemplate")).toString();
    var configInfo = {menupath: "../" + config.uiname + "menu"}
    var configContent = configtemplate
      .replace(/@menuconfig/g, JSON.stringify(configInfo))

    var configPath = path.join("./", config.uipath + "config.js");
    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, configContent);
    }
}

function processUi(map) {
    map.forEach((mapItem) => {
        // 构建数据源
        var columnsContent = createColumnsContent(mapItem);
        var uriContent = createUriContent(mapItem);

        var model = util.firstToUpperCase(mapItem.table.dataIndex)

        // 构建页面详情、列表页面
        var addtemplate = fs.readFileSync(path.join(__dirname, "../template/addtemplate")).toString();
        var listtemplate = fs.readFileSync(path.join(__dirname, "../template/listtemplate")).toString();
        var maptemplate = fs.readFileSync(path.join(__dirname, "../template/maptemplate")).toString();

        var addcontent = addtemplate.replace(/{@Title}/g, "Add" + model).replace(/{@map}/g, mapItem.table.dataIndex + "map");
        var listcontent = listtemplate.replace(/{@Title}/g, "List" + model).replace(/{@map}/g, mapItem.table.dataIndex + "map");
        var mapcontent = maptemplate.replace(/{@Columns}/g, columnsContent).replace(/{@Uri}/g, uriContent);

        // // 创建文件目录
        var fileRootPath = path.join("./", config.uipath + config.uiname + mapItem.group.dataIndex + "/");
        if (!fs.existsSync(fileRootPath)) {
            util.mkdirsSync(fileRootPath);
        }

        var mapPath = fileRootPath + mapItem.table.dataIndex + "map.js";
        var addPath = fileRootPath + mapItem.table.dataIndex + "add.js";
        var listPath = fileRootPath + mapItem.table.dataIndex + "list.js";

        // 已生成的接口需手动删除， 防止修改后被覆盖
        if (!fs.existsSync(mapPath)) {
            fs.writeFileSync(mapPath, mapcontent);
        }

        if (!fs.existsSync(addPath)) {
            fs.writeFileSync(addPath, addcontent);
        }

        if (!fs.existsSync(listPath)) {
            fs.writeFileSync(listPath, listcontent);
        }
    })
}

module.exports = {
    processUi: processUi,
    processMenu: processMenu
}