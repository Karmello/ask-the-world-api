import validationDict from './../src/lib/atw-shared/validation/dictionary'
import { X_AUTH_TOKEN, AppError } from './../src/lib/atw-shared/utils/index'
import userMocks from './../mocks/data/users'
import { api, chai, expect } from './_index'

describe('PUT /update-password', () => {
  //
  let token

  before(done => {
    chai
      .request(api)
      .post('/authentication')
      .send({ username: userMocks[2].username, password: 'cocacola100' })
      .end((err, res) => {
        token = res.header[X_AUTH_TOKEN]
        done()
      })
  })

  describe('no token', () => {
    it('should return 401 and message', done => {
      chai
        .request(api)
        .put('/update-password')
        .end((err, res) => {
          res.should.have.status(401)
          res.text.should.equal(AppError.SessionExpired)
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
        .send({ _id: userMocks[2]._id.toString() })
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
          _id: userMocks[2]._id.toString(),
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
          _id: userMocks[2]._id.toString(),
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
          _id: userMocks[2]._id.toString(),
          currentPassword: 'cocacola100',
          newPassword: 'cocacola200',
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body._id.should.equal(userMocks[2]._id.toString())
          res.body.timestamp.should.equal(userMocks[2].registeredAt)
          done()
        })
    })
  })
})
