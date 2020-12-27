import _chai, { should, expect as _expect } from 'chai'
import chaiHttp from 'chai-http'

import _api from './../src/index'
import { UserModel, QuestionModel } from './../src/models/index'
import userMocks from './../src/mocks/data/users'
import questionMocks from './../src/mocks/data/questions'

_chai.use(should)
_chai.use(chaiHttp)

export const chai = _chai
export const expect = _expect
export const api = _api

describe('', () => {
  it('ready to run specs', done => {
    setTimeout(() => {
      //
      UserModel.collection.deleteMany({}, () => {
        UserModel.collection.insertOne(userMocks[0])
        UserModel.collection.insertOne(userMocks[1])
        UserModel.collection.insertOne(userMocks[2])
      })
      QuestionModel.collection.deleteMany({}, () => {
        QuestionModel.collection.insertMany(questionMocks)
      })

      require('./info.spec')
      require('./registration.spec')
      require('./authentication.spec')
      require('./read-user.spec')
      require('./update-user.spec')
      require('./update-password.spec')
      require('./create-question.spec')
      require('./get-questions.spec')
      require('./answer-question.spec')
      require('./delete-question.spec')
      require('./read-stats.spec')
      done()
    }, 3000)
  })
})
