import { expect } from 'chai'
import { UserModel } from 'models/index'

describe('user sex validation', () => {
  //
  it('none => required', () => {
    const user = new UserModel()
    const err = user.validateSync()
    expect(err.errors.sex.kind).to.eql('required')
  })

  it('undefined => required', () => {
    const user = new UserModel({ sex: undefined })
    const err = user.validateSync()
    expect(err.errors.sex.kind).to.eql('required')
  })

  it('null => required', () => {
    const user = new UserModel({ sex: null })
    const err = user.validateSync()
    expect(err.errors.sex.kind).to.eql('required')
  })

  it('empty string => required', () => {
    const user = new UserModel({ sex: '' })
    const err = user.validateSync()
    expect(err.errors.sex.kind).to.eql('required')
  })

  it('wrong => checkSex', () => {
    const user = new UserModel({ sex: 'f' })
    const err = user.validateSync()
    expect(err.errors.sex.kind).to.eql('checkSex')
  })

  it('wrong => checkSex', () => {
    const user = new UserModel({ sex: 'm' })
    const err = user.validateSync()
    expect(err.errors.sex.kind).to.eql('checkSex')
  })

  it('valid => no error', () => {
    const user = new UserModel({ sex: 'F' })
    const err = user.validateSync()
    expect(err.errors.sex).to.eql(undefined)
  })

  it('valid => no error', () => {
    const user = new UserModel({ sex: 'M' })
    const err = user.validateSync()
    expect(err.errors.sex).to.eql(undefined)
  })
})
