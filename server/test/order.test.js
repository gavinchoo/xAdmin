const supertest = require('supertest')
const assert = require('power-assert')

describe('mall-api-test-order', () => {
    const api = supertest('http://localhost:8000')

    var token = "";
    it("Accesstoken", (done) => {
        var body = {username: '18170880824', pwd: '123456'}
        api.post('/Api/User/Accesstoken')
          .send(body)
          .expect(200)
          .end(function (req, res) {
              if (res.body.code == 0) {
                  api.post('/Api/User/Register')
                    .send(body)
                    .expect(200)
                    .end(function (req, res) {
                        token = res.body.data.token
                        done()
                    })
              } else {
                  token = res.body.data.token
                  done()
              }
          })
    })

    it.skip('addOrder', (done) => {
        api.post('/Api/Order/addOrder')
          .set("Authorization", token)
          .send({
              cart_ids: ["5a601a91316c600b1cccb93e", "5a601b4171a5ee09d441f4f5"], address: {
                  "_id": "5a55c05b538ca40f081dc37c",
                  "realname": "AAAA",
                  "address": "dfdsf",
                  "phone": "21323213",
                  "province": "广东",
                  "province_id": 213,
                  "city": "广东",
                  "city_id": 213,
                  "userid": "5a509e92bc209c49bcb3cce7",
              }
          })
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it.skip('getMyOrders', (done) => {
        api.post('/Api/Order/getMyOrders')
          .set("Authorization", token)
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it('editOrderStatus', (done) => {
        api.post('/Api/Order/editOrderStatus')
          .set("Authorization", token)
          .send({order_id: "5a61440ba6125605ac83d179", status: "Delivery"})
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })
})