import mongoose from 'mongoose'

import { ApiUrlPath, X_AUTH_TOKEN } from '../src/ext/atw-shared/source/utils'
import msgs from '../src/utils/msgs'
import { api, chai, expect } from './'
import { getFreshAuthToken } from '../src/helpers/index'
import { UserModel } from '../src/models'

const _id = new mongoose.Types.ObjectId('5eeb976152c1dc555c2d676c')

describe('activateUser', () => {
  it('should responde with NO_SUCH_USER', done => {
    const user = { _id, config: { confirmed: true } }
    const mailToken = getFreshAuthToken(user as never, true)
    chai
      .request(api)
      .get(ApiUrlPath.UserActivate)
      .set(X_AUTH_TOKEN, mailToken)
      .end((err, res) => {
        expect(res.status).to.eql(404)
        expect(res.text).to.eql(msgs.NO_SUCH_USER)
        done()
      })
  })

  it('should responde with EMAIL_ALREADY_CONFIRMED', done => {
    const user = { _id, config: { confirmed: true } }
    UserModel.collection.insertOne(user).then(() => {
      const mailToken = getFreshAuthToken(user as never, true)
      chai
        .request(api)
        .get(ApiUrlPath.UserActivate)
        .set(X_AUTH_TOKEN, mailToken)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.text).to.eql(msgs.EMAIL_ALREADY_CONFIRMED)
          UserModel.collection.deleteMany({})
          done()
        })
    })
  })

  it('should responde with EMAIL_CONFIRMED', done => {
    const user = { _id, config: { confirmed: false } }
    UserModel.collection.insertOne(user).then(() => {
      const mailToken = getFreshAuthToken(user as never, true)
      chai
        .request(api)
        .get(ApiUrlPath.UserActivate)
        .set(X_AUTH_TOKEN, mailToken)
        .end((err, res) => {
          expect(res.status).to.eql(200)
          expect(res.text).to.eql(msgs.EMAIL_CONFIRMED)
          UserModel.collection.deleteMany({})
          done()
        })
    })
  })
})
