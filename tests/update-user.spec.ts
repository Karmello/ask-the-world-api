import validationDict from './../src/lib/ask-the-world-shared/validation/dictionary'
import { X_AUTH_TOKEN, AppError } from './../src/lib/ask-the-world-shared/utils/index'
import userMocks from './../src/mocks/data/users'
import { api, chai, expect } from './_index'

describe('PUT /update-user', () => {
  //
  let token

  before(done => {
    chai
      .request(api)
      .post('/authentication')
      .send({ username: userMocks[1].username, password: 'cocacola100' })
      .end((err, res) => {
        token = res.header[X_AUTH_TOKEN]
        done()
      })
  })

  describe('no token', () => {
    it('should return 401 and message', done => {
      chai
        .request(api)
        .put('/update-user')
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
        .put('/update-user')
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })

    it('should return 404', done => {
      chai
        .request(api)
        .put('/update-user')
        .set(X_AUTH_TOKEN, token)
        .send({ _id: '123412341234123412341234' })
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })

  describe('updating part of user object with correct values', () => {
    it('should return 400 and errors', done => {
      chai
        .request(api)
        .put('/update-user')
        .set(X_AUTH_TOKEN, token)
        .send({
          _id: userMocks[1]._id.toString(),
          dateOfBirth: '1999-04-23',
          country: 'FR',
        })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.email.kind.should.equal('required')
          res.body.username.kind.should.equal('required')
          res.body.sex.kind.should.equal('required')
          done()
        })
    })
  })

  describe('updating user with correct values', () => {
    //
    let user

    before(() => {
      user = {
        _id: userMocks[1]._id.toString(),
        email: 'newemail@email.com',
        username: 'newusername',
        dateOfBirth: '1999-04-23',
        country: 'FR',
        sex: 'F',
      }
    })

    it('should return 200 and user', done => {
      chai
        .request(api)
        .put('/update-user')
        .set(X_AUTH_TOKEN, token)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          expect(res.body).to.deep.equal({
            ...user,
            active: true,
            timestamp: userMocks[1].timestamp,
            dateOfBirth: '1999-04-23',
            country: 'FR',
            sex: 'F',
          })
          done()
        })
    })
  })

  describe('updating user with correct values + additional fields', () => {
    //
    let user

    before(() => {
      user = {
        _id: userMocks[1]._id.toString(),
        email: 'newemail@email.com',
        username: 'newusername',
        dateOfBirth: '1999-04-23',
        country: 'FR',
        sex: 'M',
      }
    })

    it('should return 200 and user', done => {
      chai
        .request(api)
        .put('/update-user')
        .set(X_AUTH_TOKEN, token)
        .send({
          ...user,
          x: 100,
          y: 200,
          z: 300,
        })
        .end((err, res) => {
          res.should.have.status(200)
          expect(res.body).to.deep.equal({
            ...user,
            active: true,
            timestamp: userMocks[1].timestamp,
          })
          done()
        })
    })
  })
})
