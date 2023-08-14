import mongoose from 'mongoose'

import { ApiUrlPath, IUser, X_AUTH_TOKEN } from '../src/ext/atw-shared/source/utils'
import { getFreshAuthToken } from '../src/helpers/index'
import msgs from '../src/utils/msgs/index'
import { api, chai, expect } from './'

describe('checkAuthToken middleware', () => {
  describe('no token', () => {
    it('should block GET/UserActivate ', done => {
      chai
        .request(api)
        .get(ApiUrlPath.UserActivate)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block GET/UserDeactivate', done => {
      chai
        .request(api)
        .get(ApiUrlPath.UserDeactivate)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block GET/UserActivationLink', done => {
      chai
        .request(api)
        .get(ApiUrlPath.UserActivationLink)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block GET/UserDeactivationLink', done => {
      chai
        .request(api)
        .get(ApiUrlPath.UserDeactivationLink)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block POST/Answer', done => {
      chai
        .request(api)
        .post(ApiUrlPath.Answer)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block PUT/Answer', done => {
      chai
        .request(api)
        .put(ApiUrlPath.Answer)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block POST/Follow', done => {
      chai
        .request(api)
        .post(ApiUrlPath.Follow)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block DELETE/Follow', done => {
      chai
        .request(api)
        .delete(ApiUrlPath.Follow)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block POST/Question', done => {
      chai
        .request(api)
        .post(ApiUrlPath.Question)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block PUT/Question', done => {
      chai
        .request(api)
        .put(ApiUrlPath.Question)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block DELETE/Question', done => {
      chai
        .request(api)
        .delete(ApiUrlPath.Question)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block POST/Report', done => {
      chai
        .request(api)
        .post(ApiUrlPath.Report)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block GET/User', done => {
      chai
        .request(api)
        .get(ApiUrlPath.User)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block PUT/User', done => {
      chai
        .request(api)
        .put(ApiUrlPath.User)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block PUT/UserPassword', done => {
      chai
        .request(api)
        .put(ApiUrlPath.UserPassword)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
  })
  describe('not mail token', () => {
    const notMailToken = getFreshAuthToken({
      _id: new mongoose.Types.ObjectId('5eeb976152c1dc555c2d676c'),
      config: {
        confirmed: true,
      },
    } as unknown as IUser)

    it('should block GET/UserActivate', done => {
      chai
        .request(api)
        .get(ApiUrlPath.UserActivate)
        .set(X_AUTH_TOKEN, notMailToken)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block GET/UserDeactivate', done => {
      chai
        .request(api)
        .get(ApiUrlPath.UserDeactivate)
        .set(X_AUTH_TOKEN, notMailToken)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
  })
  describe('not confirmed', () => {
    const token = getFreshAuthToken({
      _id: new mongoose.Types.ObjectId('5eeb976152c1dc555c2d676c'),
      config: {
        confirmed: false,
      },
    } as unknown as IUser)

    it('should block POST/Answer', done => {
      chai
        .request(api)
        .post(ApiUrlPath.Answer)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block PUT/Answer', done => {
      chai
        .request(api)
        .put(ApiUrlPath.Answer)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block POST/Follow', done => {
      chai
        .request(api)
        .post(ApiUrlPath.Follow)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block DELETE/Follow', done => {
      chai
        .request(api)
        .delete(ApiUrlPath.Follow)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block POST/Question', done => {
      chai
        .request(api)
        .post(ApiUrlPath.Question)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block PUT/Question', done => {
      chai
        .request(api)
        .put(ApiUrlPath.Question)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block DELETE/Question', done => {
      chai
        .request(api)
        .delete(ApiUrlPath.Question)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block POST/Report', done => {
      chai
        .request(api)
        .post(ApiUrlPath.Report)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
  })
  describe('not paid', () => {
    const token = getFreshAuthToken({
      _id: new mongoose.Types.ObjectId('5eeb976152c1dc555c2d676c'),
      config: {
        confirmed: true,
      },
    } as unknown as IUser)

    it('should block POST/Follow', done => {
      chai
        .request(api)
        .post(ApiUrlPath.Follow)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block DELETE/Follow', done => {
      chai
        .request(api)
        .delete(ApiUrlPath.Follow)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block POST/Question', done => {
      chai
        .request(api)
        .post(ApiUrlPath.Question)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block PUT/Question', done => {
      chai
        .request(api)
        .put(ApiUrlPath.Question)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block DELETE/Question', done => {
      chai
        .request(api)
        .delete(ApiUrlPath.Question)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block POST/Report', done => {
      chai
        .request(api)
        .post(ApiUrlPath.Report)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
  })
})
