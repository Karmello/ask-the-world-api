import _chai, { should, expect as _expect } from 'chai'
import chaiHttp from 'chai-http'

import _api from './../src/index'

_chai.use(should)
_chai.use(chaiHttp)

export const chai = _chai
export const expect = _expect
export const api = _api

describe('\nAPI integration testing\n', () => {
  it('Server ready', done => {
    setTimeout(() => {
      require('./newUser.spec')
      done()
    }, 3000)
  })
})
