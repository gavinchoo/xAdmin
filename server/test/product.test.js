const supertest = require('supertest')
const assert = require('power-assert')

describe('mall-api-test', () => {
    const api = supertest('http://localhost:8000')
    it('addCategory', (done) => {
        var category = {title: 'CCC', pid: '5a547b9a500be440ecaa31b3'}
        api.post('/Api/Product/addCategory')
          .send(category)
          .expect(200)
          .end(function (err, res) {
              assert.ifError(err)
              done()
          })
    })

    it('queryCategory', (done) => {
        var pid = {pid: '5a547b9a500be440ecaa31b3'}
        api.post('/api/v2/category/query')
          .send(pid)
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it('addProduct', (done) => {
        var params = {shop_id: "234324", title: "testProduct1"}
        api.post('/api/v1/product/create')
          .send(params)
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it('editProduct', (done) => {
        var params = {_id: "5a548a932ef3e744f0624252", title: "testProduct123", price: 100.29}
        api.post('/Api/Product/editProduct')
          .send(params)
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it('removeProduct', (done) => {
        var params = {_id: "5a548a932ef3e744f0624252"}
        api.post('/Api/Product/removeProduct')
          .send(params)
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it('queryProductForPage', (done) => {
        var params = {page: 1, pagesize: 10, shop_id: "21321123"}
        api.post('/api/v1/product/query?page=1&pagesize=10&shop_id=21321123')
          .send(params)
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })
})