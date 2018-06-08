const supertest = require('supertest')
const assert = require('power-assert')

describe('mall-api-test', () => {
    const api = supertest('http://localhost:8000')
    it('getProvinces', (done) => {
        api.post('/Api/Public/getProvinces')
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it('getCities', (done) => {
        api.post('/Api/Public/getCities')
          .send({province_id: '130000'})
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })

    it('getAreas', (done) => {
        api.post('/Api/Public/getAreas')
          .send({city_id: '130100'})
          .expect(200)
          .end(function (err, res) {
              console.log(res.text)
              assert.ifError(err)
              done()
          })
    })
})