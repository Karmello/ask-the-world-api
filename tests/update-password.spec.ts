import validationDict from './../src/lib/ask-the-world-shared/validation/dictionary'
import { X_AUTH_TOKEN } from './../src/lib/ask-the-world-shared/utils/index'
import { UserModel } from './../src/models/index'
import userMocks from './../src/mocks/data/users'
import { api, chai, getToken } from './_index'

describe('PUT /update-password', () => {
  //
  let token

  before(() => {
    UserModel.collection.deleteMany({})
    UserModel.collection.insertOne(userMocks[0])
    token = getToken()
  })

  describe('no token', () => {
    it('should return 401 and message', done => {
      chai
        .request(api)
        .put('/update-password')
        .end((err, res) => {
          res.should.have.status(401)
          res.text.should.equal(validationDict.incorrectCredentialsMsg)
          done()
        })
    })
  })

  describe('user does not exist', () => {
    //
    it('should return 404', done => {
      chai
        .request(api)
        .put('/update-password')
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })

    it('should return 404', done => {
      chai
        .request(api)
        .put('/update-password')
        .set(X_AUTH_TOKEN, token)
        .send({ _id: '123412341234123412341234' })
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })
})
