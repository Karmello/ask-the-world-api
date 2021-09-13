import isDateLessOrEqualMax from './'

describe('isDateLessOrEqualMax', () => {
  //
  it('2008-04-01, 2008-03-31 => false', () => {
    expect(isDateLessOrEqualMax('2008-04-01', '2008-03-31')).toBeFalsy()
  })

  it('2008-03-31, 2008-03-31 => true', () => {
    expect(isDateLessOrEqualMax('2008-03-31', '2008-03-31')).toBeTruthy()
  })

  it('1984-09-24, 2008-03-31 => true', () => {
    expect(isDateLessOrEqualMax('1984-09-24', '2008-03-31')).toBeTruthy()
  })
})
