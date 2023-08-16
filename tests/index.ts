import _chai, { should, expect as _expect } from 'chai'
import chaiHttp from 'chai-http'

import expressApp from './../src/index'

import {
  UserModel,
  QuestionModel,
  AnswerModel,
  FollowModel,
  ReportModel,
} from './../src/models/index'

_chai.use(should)
_chai.use(chaiHttp)

describe('API integration tests', () => {
  it('Server ready', done => {
    Promise.all([
      UserModel.collection.deleteMany({}),
      QuestionModel.collection.deleteMany({}),
      AnswerModel.collection.deleteMany({}),
      FollowModel.collection.deleteMany({}),
      ReportModel.collection.deleteMany({}),
    ])
      .then(() => {
        require('./checkAuthToken.spec')
        require('./activateUser.spec')
        require('./deactivateUser.spec')
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })
})

export const chai = _chai
export const expect = _expect
export const api = expressApp
