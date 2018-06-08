var {ResponseSuccess, ResponseError} = require('./response.result')

var addResponse = function (res, err, result) {
    if (err || result == null) {
        if (err) {
            console.log("addResponse err", err)
        }
        res.status(err ? 400 : 200).json(new ResponseError(err ? err.message : "添加失败", result))
    } else {
        res.json(new ResponseSuccess("添加成功", result))
    }
}

var delResponse = function (res, err, result) {
    if (err || result == null || result.result.n == 0) {
        if (err) {
            console.log("delResponse err", err)
        }
        res.status(err ? 400 : 200).json(new ResponseError(err ? err.message : '删除失败', result))
    }
    else {
        res.json(new ResponseSuccess('删除成功'))
    }
}

var updateResponse = function (res, err, result) {
    if (err || result.nModified != 1) {
        if (err) {
            console.log("updateResponse err", err)
        }
        res.status(err ? 400 : 200).json(new ResponseError(err ? err.message : '修改失败', result))
    }
    else {
        res.json(new ResponseSuccess('修改成功', result))
    }
}

var queryResponse = function (res, err, result) {
    if (err || result == null) {
        if (err) {
            console.log("queryResponse err", err)
        }
        res.status(err ? 400 : 200).json(new ResponseError(err ? err.message : '查询失败', result))
    }
    else {
        res.json(new ResponseSuccess('查询成功', result))
    }
}

const OperateType = {
    Create: 'add',
    Remove: 'del',
    Edit: 'update',
    Query: 'query',
}

var handleResponse = function (type, res, err, result) {
    if (type == OperateType.Create) {
        addResponse(res, err, result)
    } else if (type == OperateType.Remove) {
        delResponse(res, err, result)
    } else if (type == OperateType.Edit) {
        updateResponse(res, err, result)
    } else if (type == OperateType.Query) {
        queryResponse(res, err, result)
    }
}

module.exports = {
    handleResponse: handleResponse,
    OperateType: OperateType,
};