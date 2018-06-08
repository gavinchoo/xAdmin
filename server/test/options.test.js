const supertest = require('supertest')
const assert = require('power-assert')

describe('mall-api-test', () => {
    const api = supertest('http://localhost:8000')
    it('addOptions', (done) => {
        api.post('/Api/Options/addOptions')
          .send({pid: 10, title: '型号'})
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it('updateOptions', (done) => {
        api.post('/Api/Options/updateOptions')
          .send({
              "pid": "10",
              "title": "颜色",
              "_id": "5a5dc50007fc15110874ab2b",
              "child": [{"pid": "101", "title": "白色"}, {"pid": "102", "title": "黑色"}]
          })
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it('updateOptionsTitle', (done) => {
        api.post('/Api/Options/updateOptions')
          .send({"pid": "10", "_id": "5a5dc50007fc15110874ab2b",})
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it('queryOptions', (done) => {
        api.post('/Api/Options/queryOptions')
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it('removeOptions', (done) => {
        api.post('/Api/Options/removeOptions')
          .send({"_id": "5a5eb5ee1383a021782344a4", "child": {"pid": "102", "title": "黑色"}})
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it('addOptionPrices', (done) => {
        api.post('/Api/Options/addOptionPrices')
          .send({
              "product_id": "5a5eb5ee1383a021782344a4",
              "option": {
                  "_id": "5a5eeeab47a791248865f9a3",
                  "pid": "11",
                  "title": "型号",
                  "__v": 0,
                  "child": [{
                      "_id": "5a5ef62eca64b13574becb44",
                      "title": "大",
                      "pid": "111"
                  }, {"_id": "5a5ef62eca64b13574becb43", "title": "小", "pid": "112"}]
              }
          })
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it('addProductOptionPrices', (done) => {
        api.post('/Api/Options/addProductOptionPrices')
          .send({
              "product_id": "5a5eb5ee1383a021782344a4",
              "option_price": {"price": 100, "product_option_id": "101,111"}
          })
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it('queryProductOptionPrices', (done) => {
        api.post('/Api/Options/queryProductOptionPrices')
          .send({
              "product_id": "5a5eb5ee1383a021782344a4",
          })
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })
})