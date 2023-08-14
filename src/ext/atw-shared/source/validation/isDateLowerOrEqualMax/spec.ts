import isDateLowerOrEqualMax from './'

describe('isDateLowerOrEqualMax', () => {
  //
  it('2008-04-01, 2008-03-31 => false', () => {
    expect(isDateLowerOrEqualMax('2008-04-01', '2008-03-31')).toBeFalsy()
  })

  it('2008-03-31, 2008-03-31 => true', () => {
    expect(isDateLowerOrEqualMax('2008-03-31', '2008-03-31')).toBeTruthy()
  })

  it('1984-09-24, 2008-03-31 => true', () => {
    expect(isDateLowerOrEqualMax('1984-09-24', '2008-03-31')).toBeTruthy()
  })
})
