import validationDict from './../src/lib/ask-the-world-shared/validation/dictionary'
import { X_AUTH_TOKEN } from './../src/lib/ask-the-world-shared/utils/index'
import { UserModel } from './../src/models/index'
import userMocks from './../src/mocks/data/users'
import { api, chai, expect, getToken } from './_index'

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
        .send({})
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

  describe('empty form', () => {
    it('should return 400 and message', done => {
      chai
        .request(api)
        .put('/update-password')
        .set(X_AUTH_TOKEN, token)
        .send({ _id: userMocks[0]._id.toString() })
        .end((err, res) => {
          res.should.have.status(400)
          expect(res.body).to.deep.equal({
            currentPassword: { message: validationDict.incorrectPassword },
          })
          done()
        })
    })
  })

  describe('incorrect current password', () => {
    it('should return 400 and message', done => {
      chai
        .request(api)
        .put('/update-password')
        .set(X_AUTH_TOKEN, token)
        .send({
          _id: userMocks[0]._id.toString(),
          currentPassword: 'current-password',
          newPassword: 'cocacola200',
        })
        .end((err, res) => {
          res.should.have.status(400)
          expect(res.body).to.deep.equal({
            currentPassword: { message: validationDict.incorrectPassword },
          })
          done()
        })
    })
  })

  describe('incorrect new password', () => {
    it('should return 400 and error', done => {
      chai
        .request(api)
        .put('/update-password')
        .set(X_AUTH_TOKEN, token)
        .send({
          _id: userMocks[0]._id.toString(),
          currentPassword: 'cocacola100',
          newPassword: 'abc',
        })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.password.kind.should.equal('checkMinLength')
          done()
        })
    })
  })

  describe('correct form input', () => {
    it('should return 200 and user', done => {
      chai
        .request(api)
        .put('/update-password')
        .set(X_AUTH_TOKEN, token)
        .send({
          _id: userMocks[0]._id.toString(),
          currentPassword: 'cocacola100',
          newPassword: 'cocacola200',
        })
        .end((err, res) => {
          res.should.have.status(200)
          expect(res.body).to.deep.equal({
            _id: userMocks[0]._id.toString(),
            email: userMocks[0].email,
            username: userMocks[0].username,
            country: userMocks[0].country,
            dateOfBirth: userMocks[0].dateOfBirth,
            timestamp: userMocks[0].timestamp,
          })
          done()
        })
    })
  })
})
