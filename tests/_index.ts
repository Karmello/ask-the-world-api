import _chai, { should, expect as _expect } from 'chai'
import chaiHttp from 'chai-http'

import _api from './../src/index'

let token

_chai.use(should)
_chai.use(chaiHttp)

export const chai = _chai
export const expect = _expect
export const api = _api

export const setToken = _token => (token = _token)
export const getToken = () => token

require('./authentication.spec')
require('./create-question.spec')
require('./read-questions.spec')
require('./read-stats.spec')
require('./read-user.spec')
require('./registration.spec')
require('./status.spec')
require('./update-password.spec')
require('./update-user.spec')
