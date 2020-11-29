import { UserModel, QuestionModel } from './../src/models/index'
import userMocks from './../src/mocks/data/users'
import questionMocks from './../src/mocks/data/questions'
import { api, chai, expect } from './_index'

describe('GET /read-questions', () => {
  //
  let count

  before(() => {
    //
    UserModel.collection.deleteMany({})
    UserModel.collection.insertOne(userMocks[0])
    UserModel.collection.insertOne(userMocks[1])
    //
    QuestionModel.collection.deleteMany({})
    QuestionModel.collection.insertMany(questionMocks)
    //
    count = questionMocks.filter(q => q.userId === userMocks[0]._id).length
  })

  describe('by userId', () => {
    it('should return correct number of questions', done => {
      chai
        .request(api)
        .get('/read-questions')
        .query({ userId: userMocks[0]._id.toString() })
        .end((err, res) => {
          res.body.count.should.equal(count)
          res.body.data.length.should.equal(count)
          done()
        })
    })
  })
})
