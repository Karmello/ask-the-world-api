import { expect } from 'chai'
import { UserModel } from 'models/index'

describe('user country validation', () => {
  //
  it('none => required', () => {
    const user = new UserModel()
    const err = user.validateSync()
    expect(err.errors.country.kind).to.eql('required')
  })

  it('undefined => required', () => {
    const user = new UserModel({ country: undefined })
    const err = user.validateSync()
    expect(err.errors.country.kind).to.eql('required')
  })

  it('null => required', () => {
    const user = new UserModel({ country: null })
    const err = user.validateSync()
    expect(err.errors.country.kind).to.eql('required')
  })

  it('empty string => required', () => {
    const user = new UserModel({ country: '' })
    const err = user.validateSync()
    expect(err.errors.country.kind).to.eql('required')
  })

  it('valid => no error', () => {
    const user = new UserModel({ country: 'PL' })
    const err = user.validateSync()
    expect(err.errors.country).to.eql(undefined)
  })
})
