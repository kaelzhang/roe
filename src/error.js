const {Errors} = require('err-object')

const {E, error} = new Errors()

E('ROE_LOADER_NOT_FOUND', `Symbol.for('roe#loader') is required`)

module.exports = error
