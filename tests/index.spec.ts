import chai, { should } from 'chai'
import chaiHttp from 'chai-http'

import app from './../src/index'

chai.use(should)
chai.use(chaiHttp)

describe('GET /status', () => {
  //
  it('should return 200 and OK', done => {
    chai
      .request(app)
      .get('/status')
      .end((err, res) => {
        res.should.have.status(200)
        res.text.should.equal('OK')
        done()
      })
  })
})
