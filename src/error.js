const {Errors} = require('err-object')

const {E, error} = new Errors()

const ROE_LOADER_NOT_FOUND = `[roe] Symbol.for('roe#loader') is required`
E('ROE_LOADER_NOT_FOUND', ROE_LOADER_NOT_FOUND)

const INVALID_OPTIONS = '[roe] constructor options must be an object'
E('INVALID_OPTIONS', {
  message: INVALID_OPTIONS,
  ctor: TypeError
})

const INVALID_SINGLETON_CLIENT = '[roe:singleton] "%s" can not set options.client and options.clients both'
E('INVALID_SINGLETON_CLIENT', {
  message: INVALID_SINGLETON_CLIENT,
  ctor: TypeError
})

module.exports = {
  error,
  ROE_LOADER_NOT_FOUND,
  INVALID_OPTIONS,
  INVALID_SINGLETON_CLIENT
}
