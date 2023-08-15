import { expect } from 'chai'

import { ValidationErrorCode } from 'atw-shared/utils'
import { UserModel } from 'models/index'

describe('user username validation', () => {
  it('should return required error when no value provided', () => {
    const user = new UserModel()
    const err = user.validateSync()
    expect(err.errors.username.kind).to.eql('required')
    expect(err.errors.username.message).to.eql(ValidationErrorCode.Required)
  })

  it('should return required error when undefined provided', () => {
    const user = new UserModel({ username: undefined })
    const err = user.validateSync()
    expect(err.errors.username.kind).to.eql('required')
    expect(err.errors.username.message).to.eql(ValidationErrorCode.Required)
  })

  it('should return required error when null provided', () => {
    const user = new UserModel({ username: null })
    const err = user.validateSync()
    expect(err.errors.username.kind).to.eql('required')
    expect(err.errors.username.message).to.eql(ValidationErrorCode.Required)
  })

  it('should return required error when an empty string provided', () => {
    const user = new UserModel({ username: '' })
    const err = user.validateSync()
    expect(err.errors.username.kind).to.eql('required')
    expect(err.errors.username.message).to.eql(ValidationErrorCode.Required)
  })

  it('should return min length error when too short', () => {
    const user = new UserModel({ username: 'ab' })
    const err = user.validateSync()
    expect(err.errors.username.kind).to.eql('checkMinLength')
    expect(err.errors.username.message).to.eql(ValidationErrorCode.MinLength)
  })

  it('should return max length error when too long', () => {
    const user = new UserModel({ username: 'thisistoolongusernamethisistoolongusername' })
    const err = user.validateSync()
    expect(err.errors.username.kind).to.eql('checkMaxLength')
    expect(err.errors.username.message).to.eql(ValidationErrorCode.MaxLength)
  })

  it('should return invalid char error when multiple words found', () => {
    const user = new UserModel({ username: 'my username' })
    const err = user.validateSync()
    expect(err.errors.username.kind).to.eql('checkCredentialChars')
    expect(err.errors.username.message).to.eql(ValidationErrorCode.InvalidChar)
  })

  it('should return invalid char error when restricted character found', () => {
    const user = new UserModel({ username: 'my-username' })
    const err = user.validateSync()
    expect(err.errors.username.kind).to.eql('checkCredentialChars')
    expect(err.errors.username.message).to.eql(ValidationErrorCode.InvalidChar)
  })

  it('should return invalid char error when restricted character found', () => {
    const user = new UserModel({ username: 'my*username' })
    const err = user.validateSync()
    expect(err.errors.username.kind).to.eql('checkCredentialChars')
    expect(err.errors.username.message).to.eql(ValidationErrorCode.InvalidChar)
  })

  it('should not return any error when valid', () => {
    const user = new UserModel({ username: 'My_username' })
    const err = user.validateSync()
    expect(err.errors.username).to.eql(undefined)
  })

  it('should not return any error when valid', () => {
    const user = new UserModel({ username: 'Username' })
    const err = user.validateSync()
    expect(err.errors.username).to.eql(undefined)
  })
})
