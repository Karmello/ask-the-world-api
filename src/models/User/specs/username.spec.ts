import { expect } from 'chai'
import { UserModel } from 'models/index'

describe('user username validation', () => {
  //
  it('none => required', () => {
    const user = new UserModel()
    const err = user.validateSync()
    expect(err.errors.username.kind).to.eql('required')
  })

  it('undefined => required', () => {
    const user = new UserModel({ username: undefined })
    const err = user.validateSync()
    expect(err.errors.username.kind).to.eql('required')
  })

  it('null => required', () => {
    const user = new UserModel({ username: null })
    const err = user.validateSync()
    expect(err.errors.username.kind).to.eql('required')
  })

  it('empty string => required', () => {
    const user = new UserModel({ username: '' })
    const err = user.validateSync()
    expect(err.errors.username.kind).to.eql('required')
  })

  it('too short => checkMinLength', () => {
    const user = new UserModel({ username: 'ab' })
    const err = user.validateSync()
    expect(err.errors.username.kind).to.eql('checkMinLength')
  })

  it('too long => checkMaxLength', () => {
    const user = new UserModel({ username: 'thisistoolongusernamethisistoolongusername' })
    const err = user.validateSync()
    expect(err.errors.username.kind).to.eql('checkMaxLength')
  })

  it('multiple words => checkCredentialChars', () => {
    const user = new UserModel({ username: 'my username' })
    const err = user.validateSync()
    expect(err.errors.username.kind).to.eql('checkCredentialChars')
  })

  it('wrong char => checkCredentialChars', () => {
    const user = new UserModel({ username: 'my-username' })
    const err = user.validateSync()
    expect(err.errors.username.kind).to.eql('checkCredentialChars')
  })

  it('wrong char => checkCredentialChars', () => {
    const user = new UserModel({ username: 'my*username' })
    const err = user.validateSync()
    expect(err.errors.username.kind).to.eql('checkCredentialChars')
  })

  it('valid => no error', () => {
    const user = new UserModel({ username: 'My_username' })
    const err = user.validateSync()
    expect(err.errors.username).to.eql(undefined)
  })

  it('valid => no error', () => {
    const user = new UserModel({ username: 'Username' })
    const err = user.validateSync()
    expect(err.errors.username).to.eql(undefined)
  })
})
