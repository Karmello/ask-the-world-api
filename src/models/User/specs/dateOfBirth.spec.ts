import { expect } from 'chai'
import { UserModel } from 'models/index'

describe('user dateOfBirth validation', () => {
  //
  it('none => required', () => {
    const user = new UserModel()
    const err = user.validateSync()
    expect(err.errors.dateOfBirth.kind).to.eql('required')
  })

  it('undefined => required', () => {
    const user = new UserModel({ dateOfBirth: undefined })
    const err = user.validateSync()
    expect(err.errors.dateOfBirth.kind).to.eql('required')
  })

  it('null => required', () => {
    const user = new UserModel({ dateOfBirth: null })
    const err = user.validateSync()
    expect(err.errors.dateOfBirth.kind).to.eql('required')
  })

  it('empty string => required', () => {
    const user = new UserModel({ dateOfBirth: '' })
    const err = user.validateSync()
    expect(err.errors.dateOfBirth.kind).to.eql('required')
  })

  it('wrong format => checkDateFormat', () => {
    const user = new UserModel({ dateOfBirth: 'this is not a date format' })
    const err = user.validateSync()
    expect(err.errors.dateOfBirth.kind).to.eql('checkDateFormat')
  })

  it('wrong format => checkDateFormat', () => {
    const user = new UserModel({ dateOfBirth: '24-09-1984' })
    const err = user.validateSync()
    expect(err.errors.dateOfBirth.kind).to.eql('checkDateFormat')
  })

  it('wrong date => checkDateOfBirth', () => {
    const user = new UserModel({ dateOfBirth: '1984-02-35' })
    const err = user.validateSync()
    expect(err.errors.dateOfBirth.kind).to.eql('checkDateOfBirth')
  })

  it('too young => checkDateOfBirth', () => {
    const user = new UserModel({ dateOfBirth: '1899-12-31' })
    const err = user.validateSync()
    expect(err.errors.dateOfBirth.kind).to.eql('checkDateOfBirth')
  })

  it('valid => no error', () => {
    const user = new UserModel({ dateOfBirth: '1984-09-24' })
    const err = user.validateSync()
    expect(err.errors.dateOfBirth).to.eql(undefined)
  })
})
