import { api, chai, expect } from './_index'

describe('GET /read-stats', () => {
  it('should return 200 and data', done => {
    chai
      .request(api)
      .get('/read-stats')
      .end((err, res) => {
        res.should.have.status(200)
        expect(res.body.count.users).to.be.a('number')
        expect(res.body.count.questions).to.be.a('number')
        expect(res.body.count.answers).to.be.a('number')
        expect(res.body.count.females).to.be.a('number')
        expect(res.body.count.males).to.be.a('number')
        done()
      })
  })
})
