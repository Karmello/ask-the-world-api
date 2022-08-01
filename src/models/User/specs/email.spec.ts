import { expect } from 'chai'
import { UserModel } from 'models/index'

import { EMAIL_MAX_LENGTH } from 'atw-shared/utils/index'

describe('user email validation', () => {
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

  it('wrong format => checkEmail', () => {
    const user = new UserModel({ email: 'username@' })
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('checkEmail')
  })

  it('wrong format => checkEmail', () => {
    const user = new UserModel({ email: 'username@gmail.' })
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('checkEmail')
  })

  it('too long => checkMaxLength', () => {
    const user = new UserModel({ email: 'a'.repeat(EMAIL_MAX_LENGTH) + '@gmail.com' })
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('checkMaxLength')
  })

  it('valid => no error', () => {
    const user = new UserModel({ email: 'username@gmail.com' })
    const err = user.validateSync()
    expect(err.errors.email).to.eql(undefined)
  })
})
