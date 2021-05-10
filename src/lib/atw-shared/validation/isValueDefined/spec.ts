import isValueDefined from './'

describe('isValueDefined', () => {
  //
  it('none => false', () => {
    expect(isValueDefined()).toBeFalsy()
  })

  it('undefined => false', () => {
    expect(isValueDefined(undefined)).toBeFalsy()
  })

  it('null => false', () => {
    expect(isValueDefined(null)).toBeFalsy()
  })

  it('empty string => false', () => {
    expect(isValueDefined('')).toBeFalsy()
  })

  it('space => true', () => {
    expect(isValueDefined(' ')).toBeTruthy()
  })

  it('string => true', () => {
    expect(isValueDefined('value')).toBeTruthy()
  })
})
