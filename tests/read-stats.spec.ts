import { UserModel } from './../src/models/index'
import { api, chai } from './_index'

describe('GET /read-stats', () => {
  //
  before(() => UserModel.collection.deleteMany({}))

  it('should return 200 and data', done => {
    chai
      .request(api)
      .get('/read-stats')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.count.users.should.equal(0)
        res.body.count.questions.should.equal(0)
        res.body.count.answers.should.equal(0)
        done()
      })
  })
})
