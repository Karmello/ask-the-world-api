import { expect } from 'chai'
import { UserModel } from 'models/index'

import { EMAIL_MAX_LENGTH, ValidationErrorCode } from 'atw-shared/utils/index'

describe('user email validation', () => {
  it('should return required error when no value provided', () => {
    const user = new UserModel()
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('required')
    expect(err.errors.email.message).to.eql(ValidationErrorCode.Required)
  })

  it('should return required error when undefined provided', () => {
    const user = new UserModel({ email: undefined })
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('required')
    expect(err.errors.email.message).to.eql(ValidationErrorCode.Required)
  })

  it('should return required error when null provided', () => {
    const user = new UserModel({ email: null })
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('required')
    expect(err.errors.email.message).to.eql(ValidationErrorCode.Required)
  })

  it('should return required error when an empty string provided', () => {
    const user = new UserModel({ email: '' })
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('required')
    expect(err.errors.email.message).to.eql(ValidationErrorCode.Required)
  })

  it('should return invalid error when only spaces provided', () => {
    const user = new UserModel({ email: '   ' })
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('checkEmail')
    expect(err.errors.email.message).to.eql(ValidationErrorCode.Invalid)
  })

  it('should return invalid error when not an email', () => {
    const user = new UserModel({ email: 'username@' })
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('checkEmail')
    expect(err.errors.email.message).to.eql(ValidationErrorCode.Invalid)
  })

  it('should return invalid error when not an email', () => {
    const user = new UserModel({ email: 'username@gmail.' })
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('checkEmail')
    expect(err.errors.email.message).to.eql(ValidationErrorCode.Invalid)
  })

  it('should return max length error when too long', () => {
    const user = new UserModel({ email: 'a'.repeat(EMAIL_MAX_LENGTH) + '@gmail.com' })
    const err = user.validateSync()
    expect(err.errors.email.kind).to.eql('checkMaxLength')
    expect(err.errors.email.message).to.eql(ValidationErrorCode.MaxLength)
  })

  it('should not return any error when valid email', () => {
    const user = new UserModel({ email: 'username@gmail.com' })
    const err = user.validateSync()
    expect(err.errors.email).to.eql(undefined)
  })
})
