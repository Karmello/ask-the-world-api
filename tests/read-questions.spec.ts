import userMocks from './../src/mocks/data/users'
import questionMocks from './../src/mocks/data/questions'
import { api, chai } from './_index'

describe('GET /read-questions', () => {
  //
  let count

  before(() => {
    count = questionMocks.filter(q => q.userId === userMocks[1]._id).length
  })

  describe('by userId', () => {
    it('should return correct data', done => {
      chai
        .request(api)
        .get('/read-questions')
        .query({ userId: userMocks[1]._id.toString() })
        .end((err, res) => {
          res.body.count.should.equal(count)
          res.body.data.length.should.equal(count)
          done()
        })
    })
  })

  describe('with limit', () => {
    it('should return correct data', done => {
      chai
        .request(api)
        .get('/read-questions')
        .query({
          userId: userMocks[1]._id.toString(),
          limit: 25,
        })
        .end((err, res) => {
          res.body.count.should.equal(count)
          res.body.data.length.should.equal(count > 25 ? 25 : count)
          done()
        })
    })
  })
})
