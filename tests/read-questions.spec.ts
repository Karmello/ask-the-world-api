import userMocks from './../src/mocks/data/users'
import questionMocks from './../src/mocks/data/questions'
import { api, chai, expect } from './_index'

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
          res.should.have.status(200)
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
          res.should.have.status(200)
          res.body.count.should.equal(count)
          res.body.data.length.should.equal(count > 25 ? 25 : count)
          done()
        })
    })
  })

  describe('self answered', () => {
    //
    let userId
    before(() => (userId = userMocks[2]._id.toString()))

    it('should return correct data', done => {
      chai
        .request(api)
        .get('/read-questions')
        .query({ userId, limit: 25, selfAnswered: 1 })
        .end((err, res) => {
          res.should.have.status(200)
          expect(res.body.data.some(q => q.userId !== userId)).to.equal(false)
          done()
        })
    })
  })
})
