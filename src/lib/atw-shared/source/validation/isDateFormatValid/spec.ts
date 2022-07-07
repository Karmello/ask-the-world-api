import isDateFormatValid from './'

describe('isDateFormatValid', () => {
  //
  it('empty string => false', () => {
    expect(isDateFormatValid('')).toBeFalsy()
  })

  it('spaces => false', () => {
    expect(isDateFormatValid('   ')).toBeFalsy()
  })

  it('2010 => false', () => {
    expect(isDateFormatValid('2010')).toBeFalsy()
  })

  it('2010-05 => false', () => {
    expect(isDateFormatValid('2010-05')).toBeFalsy()
  })

  it('05-05-2010 => false', () => {
    expect(isDateFormatValid('05-05-2010')).toBeFalsy()
  })

  it('2010-05-05 => true', () => {
    expect(isDateFormatValid('2010-05-05')).toBeTruthy()
  })
})
