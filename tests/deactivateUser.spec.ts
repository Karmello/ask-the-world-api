import mongoose from 'mongoose'

import { api, chai, expect } from './'
import { X_AUTH_TOKEN, ApiUrlPath } from 'atw-shared/utils'
import { UserModel, QuestionModel, AnswerModel } from './../src/models/index'

const userId = new mongoose.Types.ObjectId('5eeb976152c1dc555c2d676c')
const questionId = new mongoose.Types.ObjectId('5eeb976152c1dc555c2d676d')
const username = 'username1'

describe('deactivateUser', () => {
  let authToken: string
  let mailToken: string

  before(done => {
    Promise.all([
      UserModel.deleteMany({}),
      QuestionModel.deleteMany({}),
      AnswerModel.deleteMany({}),
    ]).then(() => {
      Promise.all([
        UserModel.collection.insertOne({
          _id: userId,
          email: 'username1@email.com',
          username,
          password: '$2a$10$8kcJdl16EMupO2cmLFAsf.jVWkFaCV5W47Mip6BMfwUJjLM6/J0n2',
          dateOfBirth: '1995-02-15',
          country: 'PL',
          sex: 'M',
          config: {
            registeredAt: Date.now(),
            confirmed: true,
            payment: {},
          },
        }),
        QuestionModel.collection.insertOne({
          _id: questionId,
          creatorId: userId,
          text: 'Who is going to be a new President of the United States of America ?',
          answers: ['Donald Trump', 'Joe Biden'],
          numOfVotes: { exact: 1 },
          isTerminated: false,
        }),
        AnswerModel.collection.insertOne({
          questionId,
          answererId: userId,
          selectedIndexes: [0],
        }),
      ])
        .then(() => {
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

  it('user exists', async () => {
    const doc = await UserModel.collection.findOne({ _id: userId })
    expect(doc?._id.toString()).to.eql(userId.toString())
  })

  it('question exists', async () => {
    const docs = await QuestionModel.collection.find({ creatorId: userId }).toArray()
    expect(docs?.length).to.eql(1)
  })

  it('answer exists', async () => {
    const docs = await AnswerModel.collection.find({ answererId: userId }).toArray()
    expect(docs?.length).to.eql(1)
  })

  it('should authenticate', done => {
    chai
      .request(api)
      .post(ApiUrlPath.AuthenticateUser)
      .send({ username, password: 'cocacola100' })
      .end((err, res) => {
        authToken = res.header[X_AUTH_TOKEN]
        expect(res.status).to.eql(200)
        expect(typeof res.header[X_AUTH_TOKEN]).to.eql('string')
        done()
      })
  })

  it('should get deactivation token', done => {
    chai
      .request(api)
      .get(ApiUrlPath.GetDeactivationLink)
      .set(X_AUTH_TOKEN, authToken)
      .end((err, res) => {
        mailToken = res.header[X_AUTH_TOKEN]
        expect(res.status).to.eql(200)
        expect(typeof res.header[X_AUTH_TOKEN]).to.eql('string')
        done()
      })
  })

  it('should deactivate', done => {
    chai
      .request(api)
      .get(ApiUrlPath.DeactivateAccount)
      .set(X_AUTH_TOKEN, mailToken)
      .end(err => {
        expect(err).to.eql(null)
        done()
      })
  })

  it('user removed', async () => {
    const doc = await UserModel.collection.findOne({ _id: userId })
    expect(doc).to.eql(null)
  })

  it('question removed', async () => {
    const docs = await QuestionModel.collection.find({ creatorId: userId }).toArray()
    expect(docs?.length).to.eql(0)
  })

  it('answer removed', async () => {
    const docs = await AnswerModel.collection.find({ answererId: userId }).toArray()
    expect(docs?.length).to.eql(0)
  })
})
