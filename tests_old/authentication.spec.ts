import validationDict from './../src/lib/atw-shared/validation/dictionary'
import { X_AUTH_TOKEN, AppError } from './../src/lib/atw-shared/utils/index'
import userMocks from './../mocks/data/users'
import { api, chai } from './_index'

describe('POST /authentication', () => {
  //
  let token

  describe('no token and credentials', () => {
    it('should return 401 and message', done => {
      chai
        .request(api)
        .post('/authentication')
        .end((err, res) => {
          res.should.have.status(401)
          res.text.should.equal(validationDict.incorrectCredentialsMsg)
          done()
        })
    })
  })

  describe('wrong credentials', () => {
    it('should return 401 and message', done => {
      chai
        .request(api)
        .post('/authentication')
        .send({
          username: 'username',
          password: 'password',
        })
        .end((err, res) => {
          res.should.have.status(401)
          res.text.should.equal(validationDict.incorrectCredentialsMsg)
          done()
        })
    })
  })

  describe('wrong token', () => {
    it('should return 401 and message', done => {
      chai
        .request(api)
        .post('/authentication')
        .set(X_AUTH_TOKEN, '1234')
        .end((err, res) => {
          res.should.have.status(401)
          res.text.should.equal(AppError.SessionExpired)
          done()
        })
    })
  })

  describe('wrong token and correct credentials', () => {
    it('should return 401 and message', done => {
      chai
        .request(api)
        .post('/authentication')
        .set(X_AUTH_TOKEN, '1234')
        .send({
          username: userMocks[0].username,
          password: 'cocacola100',
        })
        .end((err, res) => {
          res.should.have.status(401)
          res.text.should.equal(AppError.SessionExpired)
          done()
        })
    })
  })

  describe('correct credentials', () => {
    it('should return 201, user and token', done => {
      chai
        .request(api)
        .post('/authentication')
        .send({
          username: userMocks[0].username,
          password: 'cocacola100',
        })
        .end((err, res) => {
          res.should.have.status(201)
          res.body.email.should.equal(userMocks[0].email)
          res.body.username.should.equal(userMocks[0].username)
          res.body.dateOfBirth.should.equal(userMocks[0].dateOfBirth)
          res.body.country.should.equal(userMocks[0].country)
          res.body.timestamp.should.equal(userMocks[0].registeredAt)
          res.header[X_AUTH_TOKEN].should.exist
          token = res.header[X_AUTH_TOKEN]
          done()
        })
    })
  })

  describe('token', () => {
    it('should return 201, user and token', done => {
      chai
        .request(api)
        .post('/authentication')
        .set({
          [X_AUTH_TOKEN]: token,
        })
        .end((err, res) => {
          res.should.have.status(201)
          res.body.email.should.equal(userMocks[0].email)
          res.body.username.should.equal(userMocks[0].username)
          res.body.dateOfBirth.should.equal(userMocks[0].dateOfBirth)
          res.body.country.should.equal(userMocks[0].country)
          res.body.timestamp.should.equal(userMocks[0].registeredAt)
          res.header[X_AUTH_TOKEN].should.exist
          done()
        })
    })
  })
})
