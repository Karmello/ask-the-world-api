import { expect } from 'chai'
import { UserModel } from 'models/index'

describe('UserModel', () => {
  //
  describe('email', () => {
    //
    it('required', () => {
      const user = new UserModel()
      const err = user.validateSync()
      expect(err.errors.email.kind).to.eql('required')
    })

    it('required', () => {
      const user = new UserModel({
        email: null,
      })
      const err = user.validateSync()
      expect(err.errors.email.kind).to.eql('required')
    })

    it('required', () => {
      const user = new UserModel({ email: '' })
      const err = user.validateSync()
      expect(err.errors.email.kind).to.eql('required')
    })

    it('checkEmail', () => {
      const user = new UserModel({ email: 'user@' })
      const err = user.validateSync()
      expect(err.errors.email.kind).to.eql('checkEmail')
    })

    it('checkEmail', () => {
      const user = new UserModel({ email: 'user@gmail.' })
      const err = user.validateSync()
      expect(err.errors.email.kind).to.eql('checkEmail')
    })

    it('checkEmail', () => {
      const user = new UserModel({
        email: 'user_user_user_user_user_user_user_user_user_user@gmail.com',
      })
      const err = user.validateSync()
      expect(err.errors.email.kind).to.eql('checkMaxLength')
    })

    it('OK', () => {
      const user = new UserModel({ email: 'user@gmail.com' })
      const err = user.validateSync()
      expect(err.errors.email).to.be.undefined
    })

    it('OK', () => {
      const user = new UserModel({ email: 'user_user_user_user@gmail.com' })
      const err = user.validateSync()
      expect(err.errors.email).to.be.undefined
    })
  })

  describe('username', () => {
    //
    it('required', () => {
      const user = new UserModel()
      const err = user.validateSync()
      expect(err.errors.username.kind).to.eql('required')
    })

    it('required', () => {
      const user = new UserModel({ username: null })
      const err = user.validateSync()
      expect(err.errors.username.kind).to.eql('required')
    })

    it('required', () => {
      const user = new UserModel({ username: '' })
      const err = user.validateSync()
      expect(err.errors.username.kind).to.eql('required')
    })
  })
})
