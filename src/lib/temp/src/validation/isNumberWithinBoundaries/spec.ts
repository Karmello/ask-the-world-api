import isNumberWithinBoundaries from './'

describe('isNumberWithinBoundaries', () => {
  //
  it('7, <5, 10> => true', () => {
    expect(isNumberWithinBoundaries(7, 5, 10)).toBeTruthy()
  })

  it('5, <5, 10> => true', () => {
    expect(isNumberWithinBoundaries(5, 5, 10)).toBeTruthy()
  })

  it('10, <5, 10> => true', () => {
    expect(isNumberWithinBoundaries(10, 5, 10)).toBeTruthy()
  })

  it('4, <5, 10> => false', () => {
    expect(isNumberWithinBoundaries(4, 5, 10)).toBeFalsy()
  })

  it('11, <5, 10> => false', () => {
    expect(isNumberWithinBoundaries(11, 5, 10)).toBeFalsy()
  })
})
