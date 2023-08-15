import mongoose from 'mongoose'

import { ApiUrlPath, IUser, X_AUTH_TOKEN } from '../src/ext/atw-shared/source/utils'
import { getFreshAuthToken } from '../src/helpers/index'
import msgs from '../src/utils/msgs/index'
import { api, chai, expect } from './'

describe('checkAuthToken middleware', () => {
  describe('no token', () => {
    it('should block ActivateAccount ', done => {
      chai
        .request(api)
        .get(ApiUrlPath.ActivateAccount)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block DeactivateAccount', done => {
      chai
        .request(api)
        .get(ApiUrlPath.DeactivateAccount)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block GetActivationLink', done => {
      chai
        .request(api)
        .get(ApiUrlPath.GetActivationLink)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block GetDeactivationLink', done => {
      chai
        .request(api)
        .get(ApiUrlPath.GetDeactivationLink)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block CreateAnswer', done => {
      chai
        .request(api)
        .post(ApiUrlPath.CreateAnswer)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block UpdateAnswer', done => {
      chai
        .request(api)
        .put(ApiUrlPath.UpdateAnswer)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block CreateFollow', done => {
      chai
        .request(api)
        .post(ApiUrlPath.CreateFollow)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block DeleteFollow', done => {
      chai
        .request(api)
        .delete(ApiUrlPath.DeleteFollow)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block CreateQuestion', done => {
      chai
        .request(api)
        .post(ApiUrlPath.CreateQuestion)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block TerminateQuestion', done => {
      chai
        .request(api)
        .put(ApiUrlPath.TerminateQuestion)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block DeleteQuestion', done => {
      chai
        .request(api)
        .delete(ApiUrlPath.DeleteQuestion)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block CreateReport', done => {
      chai
        .request(api)
        .post(ApiUrlPath.CreateReport)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block GetUser', done => {
      chai
        .request(api)
        .get(ApiUrlPath.GetUser)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block UpdateUser', done => {
      chai
        .request(api)
        .put(ApiUrlPath.UpdateUser)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block UpdatePassword', done => {
      chai
        .request(api)
        .put(ApiUrlPath.UpdatePassword)
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

    it('should block ActivateAccount', done => {
      chai
        .request(api)
        .get(ApiUrlPath.ActivateAccount)
        .set(X_AUTH_TOKEN, notMailToken)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block DeactivateAccount', done => {
      chai
        .request(api)
        .get(ApiUrlPath.DeactivateAccount)
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

    it('should block CreateAnswer', done => {
      chai
        .request(api)
        .post(ApiUrlPath.CreateAnswer)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block UpdateAnswer', done => {
      chai
        .request(api)
        .put(ApiUrlPath.UpdateAnswer)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block CreateFollow', done => {
      chai
        .request(api)
        .post(ApiUrlPath.CreateFollow)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block DeleteFollow', done => {
      chai
        .request(api)
        .delete(ApiUrlPath.DeleteFollow)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block CreateQuestion', done => {
      chai
        .request(api)
        .post(ApiUrlPath.CreateQuestion)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block TerminateQuestion', done => {
      chai
        .request(api)
        .put(ApiUrlPath.TerminateQuestion)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block DeleteQuestion', done => {
      chai
        .request(api)
        .delete(ApiUrlPath.DeleteQuestion)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block CreateReport', done => {
      chai
        .request(api)
        .post(ApiUrlPath.CreateReport)
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

    it('should block CreateFollow', done => {
      chai
        .request(api)
        .post(ApiUrlPath.CreateFollow)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block DeleteFollow', done => {
      chai
        .request(api)
        .delete(ApiUrlPath.DeleteFollow)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block CreateQuestion', done => {
      chai
        .request(api)
        .post(ApiUrlPath.CreateQuestion)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block TerminateQuestion', done => {
      chai
        .request(api)
        .put(ApiUrlPath.TerminateQuestion)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block DeleteQuestion', done => {
      chai
        .request(api)
        .delete(ApiUrlPath.DeleteQuestion)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
    it('should block CreateReport', done => {
      chai
        .request(api)
        .post(ApiUrlPath.CreateReport)
        .set(X_AUTH_TOKEN, token)
        .end((err, res) => {
          expect(res.status).to.eql(403)
          expect(res.body).to.eql({ msg: msgs.ILLEGAL_ACTION })
          done()
        })
    })
  })
})
