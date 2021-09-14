import hasCredentialAllCharsValid from './'

describe('hasCredentialAllCharsValid', () => {
  //
  describe('username', () => {
    //
    it('empty string => false', () => {
      expect(hasCredentialAllCharsValid('')).toBeFalsy()
    })

    it('hello world => false', () => {
      expect(hasCredentialAllCharsValid('hello world')).toBeFalsy()
    })

    it('a&b&c => false', () => {
      expect(hasCredentialAllCharsValid('a&b&c')).toBeFalsy()
    })

    it('abc => true', () => {
      expect(hasCredentialAllCharsValid('abc')).toBeTruthy()
    })

    it('Karmello => true', () => {
      expect(hasCredentialAllCharsValid('Karmello')).toBeTruthy()
    })

    it('my_username_100 => true', () => {
      expect(hasCredentialAllCharsValid('my_username_100')).toBeTruthy()
    })
  })

  describe('password', () => {
    //
    it('empty string => false', () => {
      expect(hasCredentialAllCharsValid('', true)).toBeFalsy()
    })

    it('cocacola*100 => false', () => {
      expect(hasCredentialAllCharsValid('cocacola*100', true)).toBeFalsy()
    })

    it('cocacola100 => true', () => {
      expect(hasCredentialAllCharsValid('cocacola100', true)).toBeTruthy()
    })
  })
})
