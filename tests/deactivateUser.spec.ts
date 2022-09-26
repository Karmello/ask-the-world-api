import mongoose from 'mongoose'

import { api, chai, expect } from './'
import { X_AUTH_TOKEN, ApiUrlPath } from './../src/ext/atw-shared/source/utils/index'
import { UserModel, QuestionModel, AnswerModel } from './../src/models/index'

const userId = new mongoose.Types.ObjectId('5eeb976152c1dc555c2d676c')
const questionId = new mongoose.Types.ObjectId('5eeb976152c1dc555c2d676d')
const username = 'username1'

describe('deactivateUser', () => {
  let authToken: string
  let mailToken: string

  before(done => {
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
    })

    QuestionModel.collection.insertOne({
      _id: questionId,
      creatorId: userId,
      text: 'Who is going to be a new President of the United States of America ?',
      answers: ['Donald Trump', 'Joe Biden'],
      numOfVotes: { exact: 1 },
      isStopped: false,
    })

    AnswerModel.collection.insertOne({
      questionId,
      answererId: userId,
      selectedIndexes: [0],
    })

    done()
  })

  it('user exists', done => {
    UserModel.collection.findOne({ username }).then(doc => {
      console.log(doc)
      expect(doc?._id).to.eql(userId)
      done()
    })
  })

  it('question exists', done => {
    QuestionModel.collection.find({ creatorId: userId }).toArray((err, docs) => {
      expect(docs?.length).to.eql(1)
      done()
    })
  })

  it('answer exists', done => {
    AnswerModel.collection.find({ answererId: userId }).toArray((err, docs) => {
      expect(docs?.length).to.eql(1)
      done()
    })
  })

  it('should authenticate', done => {
    chai
      .request(api)
      .post(ApiUrlPath.UserAuthenticate)
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
      .get(ApiUrlPath.UserDeactivationLink)
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
      .get(ApiUrlPath.UserDeactivate)
      .set(X_AUTH_TOKEN, mailToken)
      .end(err => {
        expect(err).to.eql(null)
        done()
      })
  })

  it('user removed', done => {
    UserModel.collection.findOne({ _id: userId }).then(doc => {
      expect(doc).to.eql(null)
      done()
    })
  })

  it('question removed', done => {
    QuestionModel.collection.find({ creatorId: userId }).toArray((err, docs) => {
      expect(docs?.length).to.eql(0)
      done()
    })
  })

  it('answer removed', done => {
    AnswerModel.collection.find({ answererId: userId }).toArray((err, docs) => {
      expect(docs?.length).to.eql(0)
      done()
    })
  })
})
