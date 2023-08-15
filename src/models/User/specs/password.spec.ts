import { expect } from 'chai'
import { UserModel } from 'models/index'

import { PASSWORD_MAX_LENGTH, ValidationErrorCode } from 'atw-shared/utils/index'

describe('user password validation', () => {
  it('should return required error when no value provided', () => {
    const user = new UserModel()
    const err = user.validateSync()
    expect(err.errors.password.kind).to.eql('required')
    expect(err.errors.password.message).to.eql(ValidationErrorCode.Required)
  })

  it('should return required error when undefined provided', () => {
    const user = new UserModel({ password: undefined })
    const err = user.validateSync()
    expect(err.errors.password.kind).to.eql('required')
    expect(err.errors.password.message).to.eql(ValidationErrorCode.Required)
  })

  it('should return required error when null provided', () => {
    const user = new UserModel({ password: null })
    const err = user.validateSync()
    expect(err.errors.password.kind).to.eql('required')
    expect(err.errors.password.message).to.eql(ValidationErrorCode.Required)
  })

  it('should return required error when an empty string provided', () => {
    const user = new UserModel({ password: '' })
    const err = user.validateSync()
    expect(err.errors.password.kind).to.eql('required')
    expect(err.errors.password.message).to.eql(ValidationErrorCode.Required)
  })

  it('should return min length error when too short', () => {
    const user = new UserModel({ password: 'ab' })
    const err = user.validateSync()
    expect(err.errors.password.kind).to.eql('checkMinLength')
    expect(err.errors.password.message).to.eql(ValidationErrorCode.MinLength)
  })

  it('should return max length error when too long', () => {
    const user = new UserModel({ password: 'a'.repeat(PASSWORD_MAX_LENGTH + 1) })
    const err = user.validateSync()
    expect(err.errors.password.kind).to.eql('checkMaxLength')
    expect(err.errors.password.message).to.eql(ValidationErrorCode.MaxLength)
  })

  it('should return invalid char error when restricted character found', () => {
    const user = new UserModel({ password: 'mypassword*' })
    const err = user.validateSync()
    expect(err.errors.password.kind).to.eql('checkCredentialChars')
    expect(err.errors.password.message).to.eql(ValidationErrorCode.InvalidChar)
  })

  it('should return invalid char error when restricted character found', () => {
    const user = new UserModel({ password: 'mypassword*' })
    const err = user.validateSync()
    expect(err.errors.password.kind).to.eql('checkCredentialChars')
    expect(err.errors.password.message).to.eql(ValidationErrorCode.InvalidChar)
  })

  it('should not return any error when valid password', () => {
    const user = new UserModel({ password: 'mypassword!' })
    const err = user.validateSync()
    expect(err.errors.password).to.eql(undefined)
  })

  it('should not return any error when valid password', () => {
    const user = new UserModel({ password: 'mypassword' })
    const err = user.validateSync()
    expect(err.errors.password).to.eql(undefined)
  })
})
