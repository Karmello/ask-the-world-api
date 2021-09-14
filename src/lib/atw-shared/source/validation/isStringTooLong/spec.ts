import isStringTooLong from './'

describe('isStringTooLong', () => {
  //
  it('abc, 5 => false', () => {
    expect(isStringTooLong('abc', 5)).toBeFalsy()
  })

  it('abc, 3 => false', () => {
    expect(isStringTooLong('abc', 3)).toBeFalsy()
  })

  it('abc, 2 => true', () => {
    expect(isStringTooLong('abc', 2)).toBeTruthy()
  })
})
