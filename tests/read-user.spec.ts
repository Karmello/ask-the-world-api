import validationDict from './../src/lib/ask-the-world-shared/validation/dictionary'
import { X_AUTH_TOKEN } from './../src/lib/ask-the-world-shared/utils/index'
import { UserModel } from './../src/models/index'
import userMocks from './../src/mocks/data/users'
import { api, chai, expect, getToken } from './_index'

describe('GET /read-user', () => {
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
        .get('/read-user')
        .end((err, res) => {
          res.should.have.status(401)
          res.text.should.equal(validationDict.incorrectCredentialsMsg)
          done()
        })
    })
  })

  describe('user does not exist', () => {
    it('should return 404', done => {
      chai
        .request(api)
        .get('/read-user')
        .set(X_AUTH_TOKEN, token)
        .query({ _id: '123412341234123412341234' })
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })

  describe('user exists', () => {
    //
    let user

    before(() => {
      user = { ...userMocks[0] }
      user._id = user._id.toString()
      delete user.password
    })

    it('should return 200 and user', done => {
      chai
        .request(api)
        .get('/read-user')
        .set(X_AUTH_TOKEN, token)
        .query({ _id: user._id })
        .end((err, res) => {
          res.should.have.status(200)
          expect(res.body).to.deep.equal(user)
          done()
        })
    })
  })
})
