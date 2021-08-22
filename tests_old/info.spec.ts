import { api, chai } from './_index'

describe('GET /info', () => {
  it('should return 200 and correct object', done => {
    chai
      .request(api)
      .get('/info')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.status.should.equal('OK')
        done()
      })
  })
})
