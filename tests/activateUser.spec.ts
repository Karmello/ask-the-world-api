import mongoose from 'mongoose'

import { ApiUrlPath, IUser, X_AUTH_TOKEN } from '../src/ext/atw-shared/source/utils'
import msgs from '../src/utils/msgs'
import { api, chai, expect } from './'
import { getFreshAuthToken } from '../src/helpers/index'
import { UserModel } from '../src/models'

describe('activateUser', () => {
  it('should responde with NO_SUCH_USER', done => {
    const mailToken = getFreshAuthToken(
      {
        _id: new mongoose.Types.ObjectId('5eeb976152c1dc555c2d676c'),
        config: { confirmed: true },
      } as unknown as IUser,
      true
    )
    chai
      .request(api)
      .get(ApiUrlPath.UserActivate)
      .set(X_AUTH_TOKEN, mailToken)
      .end((err, res) => {
        expect(res.status).to.eql(404)
        expect(res.text).to.eql(msgs.NO_SUCH_USER.text)
        done()
      })
  })

  it('should responde with EMAIL_ALREADY_CONFIRMED', done => {
    UserModel.collection
      .insertOne({
        _id: new mongoose.Types.ObjectId('5eeb976152c1dc555c2d676c'),
        email: 'username1@email.com',
        username: 'username1',
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
      .then(() => {
        const mailToken = getFreshAuthToken(
          {
            _id: new mongoose.Types.ObjectId('5eeb976152c1dc555c2d676c'),
            config: { confirmed: true },
          } as unknown as IUser,
          true
        )
        chai
          .request(api)
          .get(ApiUrlPath.UserActivate)
          .set(X_AUTH_TOKEN, mailToken)
          .end((err, res) => {
            expect(res.status).to.eql(403)
            expect(res.text).to.eql(msgs.EMAIL_ALREADY_CONFIRMED.text)
            UserModel.collection.deleteMany({})
            done()
          })
      })
  })

  it('should responde with EMAIL_CONFIRMED', done => {
    UserModel.collection
      .insertOne({
        _id: new mongoose.Types.ObjectId('5eeb976152c1dc555c2d676c'),
        email: 'username1@email.com',
        username: 'username1',
        password: '$2a$10$8kcJdl16EMupO2cmLFAsf.jVWkFaCV5W47Mip6BMfwUJjLM6/J0n2',
        dateOfBirth: '1995-02-15',
        country: 'PL',
        sex: 'M',
        config: {
          registeredAt: Date.now(),
          confirmed: false,
          payment: {},
        },
      })
      .then(() => {
        const mailToken = getFreshAuthToken(
          {
            _id: new mongoose.Types.ObjectId('5eeb976152c1dc555c2d676c'),
            config: { confirmed: false },
          } as unknown as IUser,
          true
        )
        chai
          .request(api)
          .get(ApiUrlPath.UserActivate)
          .set(X_AUTH_TOKEN, mailToken)
          .end((err, res) => {
            expect(res.status).to.eql(200)
            expect(res.text).to.eql(msgs.EMAIL_CONFIRMED.text)
            UserModel.collection.deleteMany({})
            done()
          })
      })
  })
})
