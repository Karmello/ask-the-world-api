import userMocks from './../mocks/data/users'
import getQuestionMocks from './../mocks/data/questions'
import { api, chai } from './_index'
import { Filter, SortBy, X_AUTH_TOKEN, IUser } from '../src/lib/atw-shared/utils'

describe('GET /get-questions', () => {
  //
  const questionMocks = getQuestionMocks(userMocks as IUser[])
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
    count = questionMocks.filter(q => q.creatorId === userMocks[1]._id).length
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
