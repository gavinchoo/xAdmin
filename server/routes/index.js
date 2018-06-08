var express = require('express')
var router = express.Router()
var {allEntry} = require('../../src/entries/index')
var entryPage = allEntry()

// 用户页面
router.get('/', function (req, res) {
    res.render('', {})
})

// 设置入口页面
for (var key in entryPage) {
    router.get(`/${key}`, function (req, res) {
        var page = req.path.substring(1, req.path.length).replace('/', '/assets/');
        console.log(page)
        res.render(page, {})
    })
}

router.get('/login', function (req, res) {
    res.render('login', {})
})

router.get('/personlist', function (req, res) {
    res.render('personlist', {})
})

router.get('/dist/web-mobile/index', function (req, res) {
    res.render('web-mobile/index', {})
})


module.exports = router
