import _chai, { should } from 'chai'
import chaiHttp from 'chai-http'

import _api from './../src/index'

_chai.use(should)
_chai.use(chaiHttp)

export const chai = _chai
export const api = _api
