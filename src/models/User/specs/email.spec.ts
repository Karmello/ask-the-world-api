import { expect } from 'chai'
import { UserModel } from 'models/index'

describe('email validation', () => {
  //
  it('none => required', () => {
    const user = new UserModel()
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('required')
  })

  it('undefined => required', () => {
    const user = new UserModel({ email: undefined })
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('required')
  })

  it('null => required', () => {
    const user = new UserModel({ email: null })
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('required')
  })

  it('empty string => required', () => {
    const user = new UserModel({ email: '' })
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('required')
  })

  it('spaces => checkEmail', () => {
    const user = new UserModel({ email: '   ' })
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('checkEmail')
  })

  it('username@ => checkEmail', () => {
    const user = new UserModel({ email: 'username@' })
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('checkEmail')
  })

  it('username@gmail. => checkEmail', () => {
    const user = new UserModel({ email: 'username@gmail.' })
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('checkEmail')
  })

  it('username_username_username@gmail.com => checkMaxLength', () => {
    const user = new UserModel({ email: 'username_username_username@gmail.com' })
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('checkMaxLength')
  })

  it('username@gmail.com => no error', () => {
    const user = new UserModel({ email: 'username@gmail.com' })
    const err = user.validateSync()
    expect(err.errors.email).to.be.undefined
  })
})
