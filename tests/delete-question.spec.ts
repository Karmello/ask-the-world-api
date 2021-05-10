import { X_AUTH_TOKEN, AppError } from './../src/lib/atw-shared/utils/index'
import userMocks from './../mocks/data/users'
import { api, chai } from './_index'

describe('DELETE /delete-question', () => {
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
        .delete('/delete-question')
        .end((err, res) => {
          res.should.have.status(401)
          res.text.should.equal(AppError.SessionExpired)
          done()
        })
    })
  })

  describe('question does not exist', () => {
    it('should return 404', done => {
      chai
        .request(api)
        .delete('/delete-question')
        .set(X_AUTH_TOKEN, token)
        .query({ _id: '123412341234123412341234' })
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })

  describe('question exists', () => {
    it('should return 204', done => {
      chai
        .request(api)
        .delete('/delete-question')
        .set(X_AUTH_TOKEN, token)
        .query({ _id: question._id.toString() })
        .end((err, res) => {
          res.should.have.status(204)
          done()
        })
    })
  })
})
