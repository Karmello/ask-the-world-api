import { X_AUTH_TOKEN } from './../src/lib/ask-the-world-shared/utils/index'
import userMocks from './../src/mocks/data/users'
import { api, chai, expect } from './_index'

describe('POST /registration', () => {
  //
  describe('no body', () => {
    it('should return 400 and errors', done => {
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
          res.body.sex.kind.should.equal('required')
          done()
        })
    })
  })

  describe('empty object as body', () => {
    it('should return 400 and errors', done => {
      chai
        .request(api)
        .post('/registration')
        .send({})
        .end((err, res) => {
          res.should.have.status(400)
          res.body.email.kind.should.equal('required')
          res.body.username.kind.should.equal('required')
          res.body.password.kind.should.equal('required')
          res.body.dateOfBirth.kind.should.equal('required')
          res.body.country.kind.should.equal('required')
          res.body.sex.kind.should.equal('required')
          done()
        })
    })
  })

  describe('user already exists', () => {
    it('should return 400 and errors', done => {
      chai
        .request(api)
        .post('/registration')
        .send({
          email: userMocks[0].email,
          username: userMocks[0].username,
          password: 'password100',
          dateOfBirth: userMocks[0].dateOfBirth,
          country: userMocks[0].country,
          sex: userMocks[0].sex,
        })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.email.kind.should.equal('unique')
          res.body.username.kind.should.equal('unique')
          done()
        })
    })
  })

  describe('incorrect body', () => {
    it('should return 400 and errors', done => {
      chai
        .request(api)
        .post('/registration')
        .send({
          email: 'not-an-email',
          username: 'ab',
          password: 'xyz',
          dateOfBirth: 'not-date-of-birth',
          country: 'XX',
          sex: 'A',
        })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.email.kind.should.equal('checkEmail')
          res.body.username.kind.should.equal('checkMinLength')
          res.body.password.kind.should.equal('checkMinLength')
          res.body.dateOfBirth.kind.should.equal('checkDateOfBirth')
          res.body.country.kind.should.equal('checkCountry'),
            res.body.sex.kind.should.equal('checkSex')
          done()
        })
    })

    it('should return 400 and errors', done => {
      chai
        .request(api)
        .post('/registration')
        .send({
          email: 'username@email',
          username: 'sgdjgfagskfgasdgkfjahgsdkfhaksdgfkajgsdfgakjsdgfkjasgdfkgaksjhdgfaksgdkjafg',
          password: 'mxnbcvmncxbvmxnbcvbxmncbvnxbcvmnbxcmnvxmnbcvmxnbcvnxbcvmbxmbcvmxnbcmv',
          dateOfBirth: '222-33-1',
          country: 'country',
          sex: 'B',
        })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.email.kind.should.equal('checkEmail')
          res.body.username.kind.should.equal('checkMaxLength')
          res.body.password.kind.should.equal('checkMaxLength')
          res.body.dateOfBirth.kind.should.equal('checkDateOfBirth')
          res.body.country.kind.should.equal('checkCountry')
          res.body.sex.kind.should.equal('checkSex')
          done()
        })
    })

    it('should return 400 and errors', done => {
      chai
        .request(api)
        .post('/registration')
        .send({
          email: 'username@.com',
          username: 'user name',
          password: 'pass word100',
          dateOfBirth: '2020-10-10',
          country: 'Pl',
          sex: 'C',
        })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.email.kind.should.equal('checkEmail')
          res.body.username.kind.should.equal('checkAlphaChars')
          res.body.password.kind.should.equal('checkAlphaChars')
          res.body.dateOfBirth.kind.should.equal('checkDateOfBirth')
          res.body.country.kind.should.equal('checkCountry'),
            res.body.sex.kind.should.equal('checkSex')
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
          sex: 'M',
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
          res.body.sex.should.equal('M')
          expect(res.body.password).to.be.undefined
          done()
        })
    })
  })
})
