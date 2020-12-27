import userMocks from './../src/mocks/data/users'
import questionMocks from './../src/mocks/data/questions'
import { api, chai } from './_index'
import { Filter, SortBy, X_AUTH_TOKEN } from '../src/lib/ask-the-world-shared/utils'

describe('GET /get-questions', () => {
  //
  let token
  let count

  before(done => {
    chai
      .request(api)
      .post('/authentication')
      .send({ username: userMocks[0].username, password: 'cocacola100' })
      .end((err, res) => {
        token = res.header[X_AUTH_TOKEN]
        done()
      })
  })

  before(() => {
    count = questionMocks.filter(q => q.userId === userMocks[1]._id).length
  })

  describe('by userId', () => {
    it('should return correct data', done => {
      chai
        .request(api)
        .get('/get-questions')
        .set(X_AUTH_TOKEN, token)
        .query({
          userId: userMocks[1]._id.toString(),
          filter: Filter.Created,
          sortBy: SortBy.DateCreated,
          pageNo: 1,
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.count.should.equal(count)
          res.body.data.length.should.equal(count)
          done()
        })
    })
  })
})
