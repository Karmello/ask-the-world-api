import { X_AUTH_TOKEN, AppError } from './../src/lib/atw-shared/utils/index'
import userMocks from './../mocks/data/users'
import { api, chai, expect } from './_index'

describe('POST /create-question', () => {
  //
  let token

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

  describe('no token', () => {
    it('should return 401 and message', done => {
      chai
        .request(api)
        .post('/create-question')
        .end((err, res) => {
          res.should.have.status(401)
          res.text.should.equal(AppError.SessionExpired)
          done()
        })
    })
  })

  describe('incorrect form input', () => {
    //
    it('should return 400', done => {
      chai
        .request(api)
        .post('/create-question')
        .set(X_AUTH_TOKEN, token)
        .send({})
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })

    it('should return 400 and errors', done => {
      chai
        .request(api)
        .post('/create-question')
        .set(X_AUTH_TOKEN, token)
        .send({
          text: '',
          answers: [],
          options: {
            multipleChoice: false,
            maxSelectable: 0,
          },
        })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.errors.text.kind.should.equal('required')
          res.body.errors.answers.kind.should.equal('checkAnswers')
          res.body.errors['options.maxSelectable'].kind.should.equal('checkMaxSelectableAnswers')
          done()
        })
    })

    it('should return 400 and errors', done => {
      chai
        .request(api)
        .post('/create-question')
        .set(X_AUTH_TOKEN, token)
        .send({
          text: 'tooshort',
          answers: [
            {
              text:
                'toolong toolong toolong toolong toolong toolong toolong toolong toolong toolong',
            },
            { text: 'text' },
          ],
          options: {
            multipleChoice: true,
            maxSelectable: 5,
          },
        })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.errors.text.kind.should.equal('checkMinLength')
          res.body.errors['answers.0.text'].kind.should.equal('checkMaxLength')
          res.body.errors['options.maxSelectable'].kind.should.equal('checkMaxSelectableAnswers')
          done()
        })
    })
  })

  describe('correct form input', () => {
    it('should return 201 and question', done => {
      chai
        .request(api)
        .post('/create-question')
        .set(X_AUTH_TOKEN, token)
        .send({
          text: 'Who is going to be a new President of the United States of America ?',
          answers: [{ text: 'Donald Trump' }, { text: 'Joe Biden' }],
          options: {
            multipleChoice: true,
            maxSelectable: 2,
          },
        })
        .end((err, res) => {
          res.should.have.status(201)
          res.body._id.should.exist
          res.body.userId.should.equal(userMocks[0]._id.toString())
          res.body.timestamp.should.exist
          res.body.text.should.equal(
            'Who is going to be a new President of the United States of America ?'
          )
          res.body.answeredTimes.should.equal(0)
          res.body.options.should.deep.equal({
            multipleChoice: true,
            maxSelectable: 2,
          })
          res.body.answers.should.have.length(2)
          expect(res.body.answers[0]).to.deep.include({
            text: 'Donald Trump',
            votesInfo: { didVote: false, length: 0 },
          })
          expect(res.body.answers[1]).to.deep.include({
            text: 'Joe Biden',
            votesInfo: { didVote: false, length: 0 },
          })
          done()
        })
    })
  })
})
