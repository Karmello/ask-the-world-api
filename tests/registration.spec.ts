import { X_AUTH_TOKEN } from './../src/lib/ask-the-world-shared/utils/index'
import { UserModel } from './../src/models/index'
import { api, chai, expect } from './_index'

describe('POST /registration', () => {
  //
  beforeEach(() => {
    UserModel.collection.deleteMany({})
  })

  describe('empty body', () => {
    it('should return 400 and required errors', done => {
      chai
        .request(api)
        .post('/registration')
        .end((err, res) => {
          res.should.have.status(400)
          res.body.email.kind.should.equal('required')
          res.body.username.kind.should.equal('required')
          res.body.password.kind.should.equal('required')
          res.body.dateOfBirth.kind.should.equal('required')
          res.body.country.kind.should.equal('required')
          done()
        })
    })
  })

  describe('correct body', () => {
    it('should return 201, user and token', done => {
      chai
        .request(api)
        .post('/registration')
        .send({
          email: 'username@email.com',
          username: 'username',
          password: 'password100',
          dateOfBirth: '1980-05-05',
          country: 'PL',
        })
        .end((err, res) => {
          res.should.have.status(201)
          res.header[X_AUTH_TOKEN].should.exist
          res.body._id.should.exist
          res.body.timestamp.should.exist
          res.body.email.should.equal('username@email.com')
          res.body.username.should.equal('username')
          res.body.dateOfBirth.should.equal('1980-05-05')
          res.body.country.should.equal('PL')
          expect(res.body.password).to.be.undefined
          done()
        })
    })
  })
})
