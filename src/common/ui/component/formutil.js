function FormUtil() {

}

// 查询数据类型
FormUtil.prototype.isColumnSearch = (column) => {
    return column.f7 && column.f7.table;
}

// 附件数据类型
FormUtil.prototype.isColumnAttachment = (column) => {
    return column.f7 && column.f7.upload;
}

// 分录数据类型
FormUtil.prototype.isColumnEntity = (column) => {
    return column.type == Array && column.f7 && column.f7.upload == undefined;
}

FormUtil.prototype.isColumnSelect = (column) => {
    return column.f7 && column.f7.source == "category";
}

module.exports = FormUtil