const {
  runner
} = require('./fixtures/runner')

const CASES = [
  // [method, pathname, code, body]
  ['get', '/hello', 200, 'hello']
]

runner(CASES, 'app', {})
