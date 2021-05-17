import isEmailValid from './'

describe('isEmailValid', () => {
  //
  it('undefined => false', () => {
    expect(isEmailValid(undefined)).toBeFalsy()
  })

  it('null => false', () => {
    expect(isEmailValid(null)).toBeFalsy()
  })

  it('empty string => false', () => {
    expect(isEmailValid('')).toBeFalsy()
  })

  it('spaces => false', () => {
    expect(isEmailValid('   ')).toBeFalsy()
  })

  it('username => false', () => {
    expect(isEmailValid('username')).toBeFalsy()
  })

  it('username@ => false', () => {
    expect(isEmailValid('username@')).toBeFalsy()
  })

  it('username@gmail => false', () => {
    expect(isEmailValid('username@gmail')).toBeFalsy()
  })

  it('username@gmail. => false', () => {
    expect(isEmailValid('username@gmail.')).toBeFalsy()
  })

  it('@gmail.com => false', () => {
    expect(isEmailValid('@gmail.com')).toBeFalsy()
  })

  it('username@gmail.com => true', () => {
    expect(isEmailValid('username@gmail.com')).toBeTruthy()
  })

  it('user456@vp.pl => true', () => {
    expect(isEmailValid('user456@vp.pl')).toBeTruthy()
  })
})
