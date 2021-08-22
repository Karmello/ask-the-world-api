import { expect } from 'chai'
import { UserModel } from 'models/index'

describe('user password validation', () => {
  //
  it('none => required', () => {
    const user = new UserModel()
    const err = user.validateSync()
    expect(err.errors.password.kind).to.eql('required')
  })

  it('undefined => required', () => {
    const user = new UserModel({ password: undefined })
    const err = user.validateSync()
    expect(err.errors.password.kind).to.eql('required')
  })

  it('null => required', () => {
    const user = new UserModel({ password: null })
    const err = user.validateSync()
    expect(err.errors.password.kind).to.eql('required')
  })

  it('empty string => required', () => {
    const user = new UserModel({ password: '' })
    const err = user.validateSync()
    expect(err.errors.password.kind).to.eql('required')
  })

  it('too short => checkMinLength', () => {
    const user = new UserModel({ password: 'ab' })
    const err = user.validateSync()
    expect(err.errors.password.kind).to.eql('checkMinLength')
  })

  it('too long => checkMaxLength', () => {
    const user = new UserModel({ password: 'thisisverylongpasswordthisisverylongpassword' })
    const err = user.validateSync()
    expect(err.errors.password.kind).to.eql('checkMaxLength')
  })

  it('wrong char => checkCredentialChars', () => {
    const user = new UserModel({ password: 'mypassword*' })
    const err = user.validateSync()
    expect(err.errors.password.kind).to.eql('checkCredentialChars')
  })

  it('wrong char => checkCredentialChars', () => {
    const user = new UserModel({ password: 'mypassword*' })
    const err = user.validateSync()
    expect(err.errors.password.kind).to.eql('checkCredentialChars')
  })

  it('valid => no error', () => {
    const user = new UserModel({ password: 'mypassword!' })
    const err = user.validateSync()
    expect(err.errors.password).to.eql(undefined)
  })

  it('valid => no error', () => {
    const user = new UserModel({ password: 'mypassword' })
    const err = user.validateSync()
    expect(err.errors.password).to.eql(undefined)
  })
})
