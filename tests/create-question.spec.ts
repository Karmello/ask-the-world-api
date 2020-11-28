import validationDict from './../src/lib/ask-the-world-shared/validation/dictionary'
import { X_AUTH_TOKEN } from './../src/lib/ask-the-world-shared/utils/index'
import userMocks from './../src/mocks/data/users'
import { QuestionModel } from './../src/models/index'
import { api, chai, expect, getToken } from './_index'

let token

describe('POST /create-question', () => {
  //
  before(() => {
    QuestionModel.collection.deleteMany({})
    token = getToken()
  })

  describe('no token', () => {
    it('should return 401 and message', done => {
      chai
        .request(api)
        .post('/create-question')
        .end((err, res) => {
          res.should.have.status(401)
          res.text.should.equal(validationDict.incorrectCredentialsMsg)
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
        .send({ text: '', answers: [] })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.errors.text.kind.should.equal('required')
          res.body.errors.answers.kind.should.equal('checkAnswers')
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
        })
        .end((err, res) => {
          res.should.have.status(201)
          res.body._id.should.exist
          res.body.userId.should.equal(userMocks[0]._id.toString())
          res.body.timestamp.should.exist
          res.body.text.should.equal(
            'Who is going to be a new President of the United States of America ?'
          )
          expect(res.body.answers).to.deep.equal([
            {
              text: 'Donald Trump',
              votesInfo: { didVote: false, length: 0 },
            },
            {
              text: 'Joe Biden',
              votesInfo: { didVote: false, length: 0 },
            },
          ])
          res.body.answeredTimes.should.equal(0)
          res.body.options.should.deep.equal({
            multipleChoice: false,
            maxSelectable: 1,
          })
          done()
        })
    })
  })
})
