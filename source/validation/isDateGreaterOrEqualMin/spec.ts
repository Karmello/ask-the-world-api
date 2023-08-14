import isDateGreaterOrEqualMin from './'

describe('isDateGreaterOrEqualMin', () => {
  //
  it('2008-04-01, 2008-03-31 => true', () => {
    expect(isDateGreaterOrEqualMin('2008-04-01', '2008-03-31')).toBeTruthy()
  })

  it('2008-03-31, 2008-03-31 => true', () => {
    expect(isDateGreaterOrEqualMin('2008-03-31', '2008-03-31')).toBeTruthy()
  })

  it('1984-09-24, 2008-03-31 => false', () => {
    expect(isDateGreaterOrEqualMin('1984-09-24', '2008-03-31')).toBeFalsy()
  })
})
