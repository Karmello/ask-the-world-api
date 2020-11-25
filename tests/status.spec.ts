import { api, chai } from './_index'

describe('GET /status', () => {
  it('should return 200 and OK', done => {
    chai
      .request(api)
      .get('/status')
      .end((err, res) => {
        res.should.have.status(200)
        res.text.should.equal('OK')
        done()
      })
  })
})
