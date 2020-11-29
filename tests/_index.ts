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

// status
require('./status.spec')

// user
require('./registration.spec')
require('./authentication.spec')
require('./read-user.spec')
require('./update-user.spec')
require('./update-password.spec')

// question
require('./create-question.spec')
require('./read-questions.spec')

// stats
require('./read-stats.spec')
