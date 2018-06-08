/* eslint-env mocha */
const supertest = require('supertest')
const assert = require('power-assert')

describe('mall-api-test', () => {
    const api = supertest('http://localhost:8000')
    var token = "";
    it('Accesstoken', (done) => {
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


    it('getReceiveAddrs', (done) => {
        console.log(token)
        var body = {page: 2, pagesize: 10}
        api.post('/Api/User/getReceiveAddrs')
          .set("Authorization", token)
          .send(body)
          .expect(200)
          .end(function (req, res) {
              console.log(res.text)
              done()
          })
    })

    it('addReceiveAddr', (done) => {
        var body = {realname: "AAAA", address: "dfdsf", phone: "21323213", province: "广东", province_id: 213, city: "广东", city_id: 213}
        api.post('/Api/User/addReceiveAddr')
          .set("Authorization", token)
          .send(body)
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    }),

    it.only('uploadFile', (done) => {
        api.post('/Api/File/uploadPicture')
          .attach('file', 'app.js')
          .expect(200)
          .end(function (req, res) {
              console.log(res.text)
              done()
          })
    })
})
