import isStringTooShort from './'

describe('isStringTooShort', () => {
  //
  it('abc, 5 => true', () => {
    expect(isStringTooShort('abc', 5)).toBeTruthy()
  })

  it('abc, 3 => false', () => {
    expect(isStringTooShort('abc', 3)).toBeFalsy()
  })

  it('abc, 2 => false', () => {
    expect(isStringTooShort('abc', 2)).toBeFalsy()
  })
})
