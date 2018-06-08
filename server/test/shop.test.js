const supertest = require('supertest')
const assert = require('power-assert')

describe('mall-api-test-shop', () => {
    const api = supertest('http://localhost:8000')

    var token = "";
    it("Accesstoken", (done) => {
        var body = {username: 'admin', pwd: '123456'}
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

    it.skip('createShop', (done) => {
        api.post('/Api/Shop/createShop')
          .set("Authorization", token)
          .send({title: "我的店铺1"})
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it('editShop', (done) => {
        api.post('/Api/Shop/editShop')
          .set("Authorization", token)
          .send({headpic: "34532432", shop_id: "5a604ed7c353ff35e8a0f09f"})
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })
})