var {ResponseSuccess, ResponseError} = require('../../../common/http/response.result')
var ProvinceDb = require('../../db/mongo/index').Province
var CityDb = require('../../db/mongo/index').City
var AreaDb = require('../../db/mongo/index').Area

module.exports = {
    init: function (app, auth, group) {
        app.post(group + '/address/getProvinces', this.getProvinces)
        app.post(group + '/address/getCities', this.getCities)
        app.post(group + '/address/getAreas', this.getAreas)
    },

    getProvinces: function (req, res) {
        ProvinceDb.find({}).sort({id: 1}).exec(function (err, result) {
            if (result != null) {
                res.json(new ResponseSuccess("获取地址成功", result));
            } else {
                res.json(new ResponseError('获取地址失败'));
            }
        })
    },

    getCities: function (req, res) {
        var province_id = req.body.province_id
        CityDb.findByProvinceId(province_id, function (err, result) {
            if (result != null) {
                res.json(new ResponseSuccess("获取地址成功", result));
            } else {
                res.json(new ResponseError('获取地址失败'));
            }
        })
    },

    getAreas: function (req, res) {
        var city_id = req.body.city_id.substring(0, 4)
        AreaDb.find({id: {$regex: `^${city_id}`}}).sort({id: 1}).exec(function (err, result) {
            if (result != null) {
                res.json(new ResponseSuccess("获取地址成功", result));
            } else {
                res.json(new ResponseError('获取地址失败'));
            }
        })
    },

}
