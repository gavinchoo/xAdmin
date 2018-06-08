const supertest = require('supertest')
const assert = require('power-assert')

describe('mall-api-test', () => {
    const api = supertest('http://localhost:8000')
    it('addTocart', (done) => {
        api.post('/Api/Cart/addTocart')
          .send({
              imei: "231324324", shop_id: "2131211", shop_title: "sdfssadf", products: [{
                  product: {
                      "_id": "5a548afc9c234125144d62aa",
                      "shop_id": "234324",
                      "title": "testProduct1",
                      "price": 1000,
                      "images": [],
                      "__v": 0
                  }, quantity: 2, option_ids: '111,121', price: 110
              }]
          })
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it('queryCarts', (done) => {
        api.post('/Api/Cart/queryCarts')
          .send({imei: "231324324"})
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it('delCartbyId', (done) => {
        api.post('/Api/Cart/delCartbyId')
          .send({_id: "5a601ae849a5a02798c7f865"})
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it('editCart', (done) => {
        api.post('/Api/Cart/editCart')
          .send({_id: "5a601a91316c600b1cccb93e", product_id: "5a601a91316c600b1cccb93f", quantity: 11})
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })
})