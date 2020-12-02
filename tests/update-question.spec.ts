import validationDict from './../src/lib/ask-the-world-shared/validation/dictionary'
import { X_AUTH_TOKEN } from './../src/lib/ask-the-world-shared/utils/index'
import userMocks from './../src/mocks/data/users'
import { api, chai } from './_index'

describe('PUT /update-question', () => {
  //
  let token
  let question

  before(done => {
    chai
      .request(api)
      .post('/authentication')
      .send({ username: userMocks[0].username, password: 'cocacola100' })
      .end((err, res) => {
        token = res.header[X_AUTH_TOKEN]
        chai
          .request(api)
          .post('/create-question')
          .set(X_AUTH_TOKEN, token)
          .send({
            text: 'Who is going to be a new President of the United States of America ?',
            answers: [{ text: 'Donald Trump' }, { text: 'Joe Biden' }],
            options: {
              multipleChoice: false,
              maxSelectable: 1,
            },
          })
          .end((err, res) => {
            question = res.body
            done()
          })
      })
  })

  describe('no token', () => {
    it('should return 401 and message', done => {
      chai
        .request(api)
        .put('/update-question')
        .end((err, res) => {
          res.should.have.status(401)
          res.text.should.equal(validationDict.incorrectCredentialsMsg)
          done()
        })
    })
  })

  describe('question does not exist', () => {
    it('should return 404', done => {
      chai
        .request(api)
        .put('/update-question')
        .set(X_AUTH_TOKEN, token)
        .query({ questionId: '123412341234123412341234' })
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })

  describe('no body', () => {
    it('should return 400', done => {
      chai
        .request(api)
        .put('/update-question')
        .set(X_AUTH_TOKEN, token)
        .query({ questionId: question._id.toString() })
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })

  describe('an object as body', () => {
    it('should return 400', done => {
      chai
        .request(api)
        .put('/update-question')
        .set(X_AUTH_TOKEN, token)
        .query({ questionId: question._id.toString() })
        .send({})
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })

  describe('an empty array as body', () => {
    it('should return 400', done => {
      chai
        .request(api)
        .put('/update-question')
        .set(X_AUTH_TOKEN, token)
        .query({ questionId: question._id.toString() })
        .send([])
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })

  describe('an array with wrong value as body', () => {
    it('should return 400', done => {
      chai
        .request(api)
        .put('/update-question')
        .set(X_AUTH_TOKEN, token)
        .query({ questionId: question._id.toString() })
        .send([3, 1])
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })

  describe('correct body', () => {
    it('should return 200', done => {
      chai
        .request(api)
        .put('/update-question')
        .set(X_AUTH_TOKEN, token)
        .query({ questionId: question._id.toString() })
        .send([0])
        .end((err, res) => {
          res.should.have.status(200)
          res.body._id.should.equal(question._id)
          res.body.userId.should.equal(question.userId)
          res.body.answeredTimes.should.equal(1)
          res.body.answers[0].votesInfo.should.deep.equal({ length: 1, didVote: true })
          res.body.answers[1].votesInfo.should.deep.equal({ length: 0, didVote: false })
          done()
        })
    })
  })

  describe('answering already answered question with the same answer', () => {
    it('should return 403', done => {
      chai
        .request(api)
        .put('/update-question')
        .set(X_AUTH_TOKEN, token)
        .query({ questionId: question._id.toString() })
        .send([0])
        .end((err, res) => {
          res.should.have.status(403)
          done()
        })
    })
  })

  describe('answering already answered question with different answer', () => {
    it('should return 403', done => {
      chai
        .request(api)
        .put('/update-question')
        .set(X_AUTH_TOKEN, token)
        .query({ questionId: question._id.toString() })
        .send([1])
        .end((err, res) => {
          res.should.have.status(403)
          done()
        })
    })
  })
})
